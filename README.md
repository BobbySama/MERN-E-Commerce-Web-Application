This project represents my eCommerce web application with shopping cart built with MERN stack.

Single-page applications are designed to make programmers' lives easier. A user does not need to load whole new pages every time they perform an activity on a website. Instead, users may interact with it to get new material for the current page

Libraries used for the front end are React, React Router, Redux, Redux Thunk, Axios, React Bootstrap, React Helmet, React Paypal Button.

MERN stands for MongoDB, Express, React, Node, after the four key technologies that make up the stack. [15]
•	MongoDB - document database
•	Express(.js) - Node.js web framework
•	React(.js) - a client-side JavaScript framework
•	Node(.js) - the premier JavaScript web server


I tried to make all the pages as simple and intuitive as possible, with clear fonts and colors, with proper spacing between each element.


HomePage

![HomePage](https://user-images.githubusercontent.com/75377508/200853185-c6cfec71-6f75-4f65-9684-266bb86da1a8.JPG)

The HomePage contains the list of products with their details, as well as the footer and the header.

I built the header and the footer as separate react components and I merged them in every page. The header contains the name of the website, the search bar and the cart and profile buttons that are linked to the corresponding pages. 
I made the header in such way that when a user is not logged, the button with the name of the user will be replaced with a button that goes to the login page.



ProductScreen

![productScreen](https://user-images.githubusercontent.com/75377508/200853271-77779d48-c7a2-4753-894a-44ba70985646.JPG)

This screen is as example for a product screen. Why I say it is just an example? Because I did not create a different page manually for each product. The React way is to build a template component and map through each product from the backend. In this way you can fetch and display all the necessary information like the image, name, description, price, reviews. I implemented a button to add to the cart the desired quantity of products of each type. The condition for the button to be active is the quantity which must be greater than zero.


Car

![cart](https://user-images.githubusercontent.com/75377508/200853306-c9fd5c8d-5d6c-4f01-bcc9-c7ee7ea2bea0.JPG)
tScreen

To be redirected to this page you can simply press the button with the cart icon in the header encountered in every page of this project. Same with the product age, this page was built as a component and all the items in the cart are added or deleted dynamically. 


ShippingScreen

![shipping](https://user-images.githubusercontent.com/75377508/200853349-35dceee0-50d2-4e89-8869-70291b0d3bb0.JPG)
 
In this page the user introduces his shipping address which is stored for this specific order in the database.


PlaceOrderScreen

![placeOrder](https://user-images.githubusercontent.com/75377508/200853376-b137fe04-8ea7-42cf-b53f-73d1bd8e0329.JPG)

Here the user can check the details about the order and if everything is correct, he can place the order.


OrderStatusScreen

![orderSummary](https://user-images.githubusercontent.com/75377508/200853412-5431acd9-74f9-4001-89af-c1b2db5ae0f2.JPG)

This screen allows the user to check the status of his order and pay via PayPal or card if he decided to opt for the payment methods. As soon as he does the payment a message confirming the payment will be displayed in this screen. The same applies for the shippment.


LoginScreen

![sign in](https://user-images.githubusercontent.com/75377508/200853471-fbe2424a-e3eb-4975-9acb-5ce477722994.JPG)

The log in screen is composed of the email address of the account and the password associated with it. If a user doesn’t have an account, he can press the Register button to be redirected to the registration page


RegisterScreen 

![register](https://user-images.githubusercontent.com/75377508/200853548-d7975e0c-02ec-476f-aa95-ded0994e844e.JPG)

The fields needed to create an account are few and intuitive. I considered that to make fast and simple account all the information needed would be a username, email address and a password. Each field must be completed else a warning message would be displayed. The same applies if the passwords do not match.


ProfileScreen 

![profile screen](https://user-images.githubusercontent.com/75377508/200853606-2dc89277-9a9f-42eb-95a9-e70c156b12df.JPG)

This screen is only for the users that have an account. Here users can change their account credentials and follow the status or history of their orders.

