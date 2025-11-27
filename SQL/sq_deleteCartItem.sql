CREATE PROCEDURE DeleteCartItem
  @CartID varchar(100),
  @BarCode varchar(100),
  @VariationName varchar(100)
AS
BEGIN
  SET NOCOUNT ON;

  DELETE FROM Cart_Item
  WHERE Cart_ID = @CartID 
    AND Barcode = @BarCode 
    AND Variation_Name = @VariationName;

  IF @@ROWCOUNT = 0
  BEGIN
    RETURN;
  END

END