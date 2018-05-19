# Simple-JS
Simple js is made for simplify your javascript code without use jquery

# Functions s.

### Post and Get request

```javascript
s.get('data.html', 'search=example', function(html){
    //Callback function
})

s.get('data.html', function(html){
    //Callback function
})

s.get('data.html', s.jsonToUrl([{ name: 'simple', value: 'js'}]), function(html){
    //Callback function
})

s.post('data.html', s.jsonToUrl([{ name: 'simple', value: 'js'}]), function(html){
    //Callback function
})

s.post('data.html', 'search=example', function(html){
    //Callback function
})
```

### DOM manipulation

```javascript
s.select('#container').toggleClass('superclass') //toggle one class
s.select('#container').toggleClass('multiple super class') //toggle several class

s.select('#container').html() //Return the html of the element
s.select('#container').html('<h1>Hello world !</h1>') //Change the content of element

s.select('#pseudo').val() //Return the value of the input pseudo
s.select('#pseudo').val('Hello') //Change the value of the input pseudo | Let empty for remove the content

s.select('#element').sup('span') //Return the value of span in #element

s.select('#element').press(function(){
  // Callback function when #element is pressed
})

s.change('#myID', '<h1>My html</h1>') //If a change in the html between the given value and the previous value then the id will be updated |only works with IDs and with html

s.select('#myID').diff({
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
```

### Form manipulation
```javascript
s.select('#myinput').check_input({
  min_letters: 5,
  max_letters: 10,
  forbidden_characters: ['super', 'input']
}) // Return true if all conditions are okay
```

### Mobile manipulation
```javascript
s.mobileswipe({
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
