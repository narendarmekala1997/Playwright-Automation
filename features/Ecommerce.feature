Feature: Ecommerce Validations

    @Regression
    Scenario:  Placing the order
      Given a login to Ecommerce application with "narendarmekala.1997@gmail.com" and "Naren@1997"
      When Add "ZARA COAT 3" to cart
      Then Verify "ZARA COAT 3" is displayed in the cart

    @Validation
    Scenario Outline: Scenario Outline name:  Placing the order
      Given a login to Ecommerce2 application with "<username>" and "<password>"
      Then Verify Error Message is displayed
      
      Examples:
          | username         | password    | 
          | narendarmekala   | Naren@1997  | 
          | rahulshetty1     | learning    |
      
