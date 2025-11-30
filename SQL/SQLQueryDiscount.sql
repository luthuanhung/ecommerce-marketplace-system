USE [BK-Bay]
GO

CREATE FUNCTION fnCalculateDiscountedPrice
(
    @Bar_code VARCHAR(100),
    @VariationName VARCHAR(100),
    @PromoID VARCHAR(100)
)
RETURNS DECIMAL(15, 2)
AS
BEGIN
    DECLARE @BasePrice DECIMAL(10, 2);
    DECLARE @DiscountType VARCHAR(30);
    DECLARE @DiscountValue DECIMAL(10, 2);
    DECLARE @FinalPrice DECIMAL(15, 2);
    DECLARE @CurrentDate DATE = GETDATE();

    -- Retrieve Base Price
    SELECT @BasePrice = PRICE
    FROM VARIATIONS
    WHERE Bar_code = @Bar_code AND NAME = @VariationName;

    -- product variation not found, return 0
    IF @BasePrice IS NULL
        RETURN 0.00;

    -- check validity
    SELECT 
        @DiscountType = Type, 
        @DiscountValue = Value
    FROM Promotion
    WHERE ID = @PromoID
      AND (Start_date <= @CurrentDate OR Start_date IS NULL)
      AND (End_date >= @CurrentDate OR End_date IS NULL);

    -- If promotion is invalid, not found, or expired, return the base price
    IF @DiscountType IS NULL
        RETURN @BasePrice;

    -- calculate Price
    IF @DiscountType = 'Percentage'
    BEGIN
        SET @FinalPrice = @BasePrice * (1.00 - @DiscountValue);
    END
    ELSE -- @DiscountType = 'Discount' OR 'Gift' -- fixed amount
    BEGIN
        SET @FinalPrice = @BasePrice - @DiscountValue;
        -- Ensure the price does not drop below zero
        IF @FinalPrice < 0.00
            SET @FinalPrice = 0.00;
    END

    RETURN @FinalPrice;
END
GO