import express from "express" 
import path from 'path';
import cors from 'cors';



const app = express()

const port = process.env.PORT || 3000
app.use(cors());
let products = []; // TODO: connect with mongodb instead

app.use(express.json());
app.post('/product', (req, res) => {

  const body = req.body;
  console.log(body)

  if ( // validation
      !body.name
      && !body.price
      || !body.description
  ) {
      res.status(400).send({
          message: "required parameters missing",
      });
      return;
  }



    products.push({
        id: new Date().getTime(),
        names: req.body.names,
        price: req.body.price,
        description: req.body.description
    });

    res.send({
        data:body,
        message: "product added successfully"
    });
    
})

app.get('/products', (req, res) => {
    res.send({
        message: "got all products successfully",
        data: products
    })
})
app.get('/product/:id', (req, res) => {

    const id = Number(req.params.id);

    let isFound = false;
    for (let i = 0; i < products.length; i++) {

        if (products[i].id === id) {
            res.send({
                message: `get product by id: ${products[i].id} success`,
                data: products[i]
            });

            isFound = true
            break;
        }
    }
    if (isFound === false) {
        res.status(404)
        res.send({
            message: "product not found"
        });
    }
    return;
})

app.delete('/product/:ids', (req, res) => {
    const id = Number(req.params.ids);

    let isFound = false;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            products.splice(i, 1);
            res.send({
                message: "product deleted successfully",
            });
            isFound = true
            break;
        }
    }
    if (isFound === false) {
        res.status(404)
        res.send({
            message: "delete fail: product not found"
        });
    }
})

app.put('/product/:editId', (req, res) => {

    const body = req.body;
    const id =  Number(req.params.editId);

    if ( // validation
        !body.names
        && !body.price
        && !body.description
    ) {
        res.status(400).send({
            message: "required parameters missing"
        });
        return;
    }

    let isFound = false;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {

            products[i].names = body.names;
            products[i].price = body.price;
            products[i].description = body.description;

            res.send({
                message: "product modified successfully"
            });
            isFound = true
            break;
        }
    }
    if (!isFound) {
        res.status(404)
        res.send({
            message: "edit fail: product not found"
        });
    }
    res.send({
        message: "product added successfully"
    });
})






const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, './product/build')))
app.use('*', express.static(path.join(__dirname, './product/build')))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})