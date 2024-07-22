Feature: Ecommerce Validations

    @Validation
    Scenario Outline: Scenario Outline name:  Placing the order
      Given a login to Ecommerce2 application with "<username>" and "<password>"
      Then Verify Error Message is displayed
      
      Examples:
          | username         | password    | 
          | narendarmekala   | Naren@1997  | 
          | rahulshetty1     | learning    |