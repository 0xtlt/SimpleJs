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

s.select('#container').insert('<h1>Hello world</h1>') //insert at the top
s.select('#container').insert('<h1>Hello world</h1>', false) //insert at the bottom

s.select('#container').html() //Return the html of the element
s.select('#container').html('<h1>Hello world !</h1>') //Change the content of element

s.select('#pseudo').val() //Return the value of the input pseudo
s.select('#pseudo').val('Hello') //Change the value of the input pseudo | Let empty for remove the content
```

### Form manipulation
```javascript
s.select('#myinput').check_input({
  min_letters: 5,
  max_letters: 10,
  forbidden_characters: ['super', 'input']
}) // Return true if all conditions are okay
```
