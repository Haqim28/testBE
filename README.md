# Body parser

src : yarn add body-parser

use body parser to convert to json format, will be EZ to console from re.body😎

# connect with mongo atlas

```javascript
// db
const conectDB = () => {
  try {
    mongoose.connect(
      "mongodb+srv://root:root@cluster0.c0wpdeg.mongodb.net/?retryWrites=true&w=majority"
    );

    // server
    app.listen(port, () => {
      console.log(`Server runing on ${port}`);
    });
  } catch (error) {
    console.log("eror connection");
  }
};

conectDB();
```
