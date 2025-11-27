CREATE PROCEDURE getCartItems
  @CartID varchar(100)
AS
BEGIN
  SELECT 
    CONCAT(p.Name, ' ', ci.Variation_Name) AS Name, 
    v.PRICE, 
    ci.Quantity
  FROM 
    [Cart_Item] ci 
  JOIN 
    VARIATIONS v ON ci.Barcode = v.Bar_code AND ci.Variation_Name = v.NAME
  JOIN
    Product_SKU p ON v.Bar_code = p.Bar_code
  WHERE 
    ci.Cart_ID = @CartID;
END