CREATE PROCEDURE AddVariationToCart
  @CartID varchar(100),
  @BarCode varchar(100),
  @VariationName varchar(100),
  @Quantity int
AS
BEGIN

  SET NOCOUNT ON;

  DECLARE @CurrentStock int;

  SELECT
    @CurrentStock = STOCK
  FROM VARIATIONS
  WHERE Bar_code = @BarCode AND NAME = @VariationName; 

  IF @CurrentStock IS NULL
  BEGIN
    RAISERROR('Product variation not found!', 16, 1);
    RETURN;
  END

  IF @Quantity > @CurrentStock
  BEGIN
    RAISERROR('Insufficient stock available', 16, 1);
    RETURN;
  END

  IF EXISTS (SELECT 1 FROM Cart_Item WHERE Cart_ID = @CartID AND Barcode = @BarCode AND Variation_Name = @VariationName)
  BEGIN
    IF @Quantity > @CurrentStock
    BEGIN
      RAISERROR('Cannot add. Total quantity would exceed stock.', 16, 1);
      RETURN;
    END

    UPDATE Cart_Item
    SET Quantity = @Quantity
    WHERE Cart_ID = @CartID AND Barcode = @BarCode AND Variation_Name = @VariationName
  END
  ELSE
  BEGIN
    INSERT INTO Cart_Item (Cart_ID, Barcode, Variation_Name, Quantity)
    VALUES (@CartID, @BarCode, @VariationName, @Quantity)
  END

END