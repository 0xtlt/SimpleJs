# Simple-JS
Simple js is made for simplify your javascript code without use jquery

# Functions simple.

### Post and Get request

```javascript
simple.get('data.html', 'search=example', function(html){
    //Callback function
})

simple.get('data.html', function(html){
    //Callback function
})

simple.get('data.html', simple.jsonToUrl([{ name: 'simple', value: 'js'}]), function(html){
    //Callback function
})

simple.post('data.html', simple.jsonToUrl([{ name: 'simple', value: 'js'}]), function(html){
    //Callback function
})

simple.post('data.html', 'search=example', function(html){
    //Callback function
})
```

### DOM manipulation

```javascript
simple.select('#container').toggleClass('superclass') //toggle one class
simple.select('#container').toggleClass('multiple super class') //toggle several class

simple.select('#container').html() //Return the html of the element
simple.select('#container').html('<h1>Hello world !</h1>') //Change the content of element

simple.select('#pseudo').val() //Return the value of the input pseudo
simple.select('#pseudo').val('Hello') //Change the value of the input pseudo | Let empty for remove the content

simple.select('#element').sup('span') //Return the value of span in #element

simple.select('#element').press(function(){
  // Callback function when #element is pressed
})

simple.change('#myID', '<h1>My html</h1>') //If a change in the html between the given value and the previous value then the id will be updated |only works with IDs and with html

simple.select('#myID').diff({
    strict: false, //if strict is on true, the verification will verify the type over the value
    value: 1,
    condition: 0, //the condition can be a function(value){} who return true or false
    ifalse: function (element) {
      element.toggleClass('hello') //for example
    },
    iftrue: function (element) {
      element.toggleClass('hello') //for example
    }
}) //if the value is different of the condition, iftrue will be executed else ifalse will be executed

//at the inverse of simple.select('#myID').diff you can use simple.select('#myID').equal
```

### Pages manipulation
If you want to create a multiples interfaces in your webapp, you can use the functions simple.pages and simple.page
```javascript
//initialize the pages with simple.pages | the first value will be display automatically when script will be terminated
simple.pages([
  {
    name: 'home',
    el: '#myhomepage'
  },
  {
    name: 'login',
    el: '#myloginpage'
  }//etc...
])

//now you can change the display page
simple.page('login')
simple.page('home') //etc...

```

### Form manipulation
```javascript
simple.select('#myinput').check_input({
  min_letters: 5,
  max_letters: 10,
  forbidden_characters: ['super', 'input']
}) // Return true if all conditions are okay
```

### Mobile manipulation
```javascript
simple.mobileswipe({
  toLeft: function(){
    //callback function
  },
  toRight: function(){
    //callback function
  },
  toTop: function(){
    //callback function
  },
  toBottom: function(){
    //callback function
  }
}) //This function can be used once
```
