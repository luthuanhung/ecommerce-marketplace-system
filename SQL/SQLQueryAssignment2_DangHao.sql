CREATE TRIGGER trgUpdateOrderTotal
ON Order_Item
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    DECLARE @OrdersToUpdate TABLE (orderID VARCHAR(20) PRIMARY KEY);

    INSERT INTO @OrdersToUpdate (orderID)
    SELECT DISTINCT orderID FROM inserted;

    INSERT INTO @OrdersToUpdate (orderID)
    SELECT DISTINCT orderID FROM deleted
    WHERE orderID NOT IN (SELECT orderID FROM @OrdersToUpdate);

    UPDATE [Order]
    SET Total = COALESCE(T.NewTotal, 0)
    FROM [Order] O
    INNER JOIN @OrdersToUpdate U ON O.ID = U.orderID
    LEFT JOIN (
        SELECT orderID, SUM(Quantity * Price) AS NewTotal
        FROM Order_Item
        GROUP BY orderID
    ) AS T ON U.orderID = T.orderID;
END
GO


CREATE PROCEDURE usp_GetOrderDetails
    @p_StatusFilter VARCHAR(20) = NULL,
    @p_MinItems INT = 0                  
AS
BEGIN
    SELECT
        O.ID,
        O.[Time] AS OrderTime,
        O.[Status],
        U.FullName AS Buyer,
        COUNT(OI.ID) AS ItemCount,
        O.Total
    FROM
        [Order] O
    INNER JOIN [User] U ON O.buyerID = U.ID
    INNER JOIN Order_Item OI ON O.ID = OI.OrderID
    WHERE (@p_StatusFilter IS NULL OR O.[Status] = @p_StatusFilter)
    GROUP BY O.ID, O.[Time], O.[Status], U.FullName, O.Total
    HAVING (@p_MinItems = 0 OR COUNT(OI.ID) >= @p_MinItems)    
    ORDER BY O.[Time] DESC;
END
GO


CREATE PROCEDURE usp_GetTopSellingProducts
    @p_MinQuantitySold INT = 0,
    @p_SellerID VARCHAR(20) = NULL
AS
BEGIN

    SELECT
        PS.Bar_code,
        PS.[Name],
        SUM(OI.Quantity) AS TotalQuantitySold
    FROM
        Order_Item OI

    INNER JOIN [Order] O ON OI.OrderID = O.ID

    INNER JOIN Product_SKU PS ON OI.BarCode = PS.Bar_code
    WHERE

        O.[Status] IN ('Delivered', 'Completed') 

        AND (@p_SellerID IS NULL OR PS.SellerID = @p_SellerID) 
    GROUP BY
        PS.Bar_code, PS.[Name]

    HAVING 
        SUM(OI.Quantity) >= @p_MinQuantitySold 
    ORDER BY
        TotalQuantitySold DESC;
END
GO