# Simple-JS
Simple js is made for simplify your javascript code without use jquery

# Functions ss.

### Post and Get request

```javascript
ss.get('data.html', {
  params: [{name: 'ss', value: 'js'}],
  success: function(result){
    alert(result)
  }
});

ss.get('data.html', {
  success: function(html){
      //Callback function
  }
});

ss.get('data.html', {
  params: [{name: 'ss', value: 'js'}],
  success: function(result){
    alert(result)
  }
});

ss.post('data.html', {
  params: [{name: 'ss', value: 'js'}],
  success: function(result){
    alert(result)
  }
});

ss.post('data.html', {
  params: [],
  timeout: 4000,
  success: function(result){

  },
  error: function(result){

  }
});

```

### DOM manipulation

```javascript
ss.el('#container').toggleClass('superclass') //toggle one class
ss.el('#container').toggleClass('multiple super class') //toggle several class

ss.el('#container').html() //Return the html of the element
ss.el('#container').html('<h1>Hello world !</h1>') //Change the content of element

ss.el('#pseudo').val() //Return the value of the input pseudo
ss.el('#pseudo').val('Hello') //Change the value of the input pseudo | Let empty for remove the content

ss.el('#element').press(function(){
  // Callback function when #element is pressed
})

ss.el('#myID').change('<h1>My html</h1>') //If a change in the html between the given value and the previous value then the id will be updated |only works with IDs and with html
```

### Pages manipulation
If you want to create a multiples interfaces in your webapp, you can use the functions ss.pages and ss.page
```javascript
//initialize the pages with ss.pages | the first value will be display automatically when script will be terminated
ss.pages([
  {
    name: 'home',
    el: '#myhomepage'
  },
  {
    name: 'login',
    el: '#myloginpage'
  }//etc...
])

//now you can change the displayed page
ss.page('login')
ss.page('home') //etc...

```

### Form manipulation
```javascript
ss.el('#myinput').check_input({
  min_letters: 5,
  max_letters: 10,
  forbidden_characters: ['super', 'input']
}) // Return true if all conditions are okay
```

### Mobile manipulation
```javascript
ss.mobileswipe({
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

# Beta Functions
### TurboOn ~ Make page transitions on your website faster
Why use TurboOn ?  
`TurboOn was created to free up your browser resources and server bandwidth by reloading only what is important for the navigation.`  
```javascript
ss.turboOn(); // Just add this on your javascript code for launch the beast
```
If you didn't want to reload your javascript resources you can add a property to indicate this
```html
<script ss-turbo-reload="false">
    ss.turboOn();
</script>
<!-- ss-turbo-reload="false" indicate to turboOn to don't reload this resource -->
```
### onTurbo Event
If you want to execute a function each time a page is loaded, you can do it with this function
```javascript
ss.onTurbo(function(beforeBody, pageName){
  console.log(pageName);
});
```

### scrollToThis
`scrollToThis is a function to scroll the page up to your element`
```javascript
ss.el('#element').scrollToThis();
```

### isVisible
`isVisible is a function that returns true if the item is displayed on the screen or false if it is not`
```javascript
ss.el('#element').isVisible(); //return true or false
```
