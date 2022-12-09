import './App.css';
import { useState } from 'react';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';





let baseUrl = ""
if (window.location.href.split(":")[0] === "http") {
  baseUrl = "http://localhost:3000";
  
}


function App() {

  const [data,setData] =useState ("") 
  const [allData,setAllData] =useState ([]) 
  const [show, setShow] = useState(false);
  const [editName,setEditName] =useState ("") 
  const [editPrice,setEditPrice] =useState ("") 
  const [editDesc,setEditDesc] =useState ("") 
  const [editId,setEditId] =useState (null) 
  const [searchId,setSearchId] =useState (null) 
  
  const [searchData,setSearchData] =useState ("") 
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow1(false);
  // const handleShow = () => setShow(true);
  





  





  const submitHandler =(event) =>{
    event.preventDefault()
    let productName = event.target.productName.value
    let productPrice = event.target.price.value
    let productDesc = event.target.description.value

    axios.post(`${baseUrl}/product`, {
      names: productName,
      price: productPrice,
      description:productDesc
    })
    .then((response) => {
      console.log(response);
      setData(response.data.data)
     
    }, (error) => {
      console.log(error);
    });



  }

  const alertHandler = () =>{
    let alerta = document.getElementById("alert")
    alerta.style.display="block"



  }

  const successHandler = () =>{
    let alerta = document.getElementById("alert")
    alerta.style.display="none"



  }

  const allProductsHandler=()=>{
    axios.get(`${baseUrl}/products`)
    .then((response) => {
      console.log(response);
      setAllData(response.data.data)
     
    }, (error) => {
      console.log(error);
    });

        let displayDiv = document.getElementById("display")
        displayDiv.style.display = "block"
        
        let addBtn = document.getElementById("add")
        addBtn.style.display = "block"

        let inputDiv = document.getElementById("input")
        inputDiv.style.display = "none" 


  }


  const addShow = () =>{
    let inputDiv = document.getElementById("input")
    inputDiv.style.display = "block" 

    let displayDiv = document.getElementById("display")
    displayDiv.style.display = "none"

    let addBtn = document.getElementById("add")
    addBtn.style.display = "none"


  }

  const deleteProductHandler = (ids) =>{
    console.log(ids)
    axios.delete(`${baseUrl}/product/${ids}`)
    .then(response => {
      console.log("response: ", response);
      alert("Product Deleted Successfully")
      window.location.reload();

    })

    .catch(err => {
        console.log("error: ", err);
    })

  }

  const handleData = async (id,names,price,desc) =>{
    
      
  
    setShow(true)

    // setEditId(id)
    // setEditName(names)
    // setEditPrice(price)
    // setEditDesc(desc)

    // console.log(editId)
    // console.log(editName)


  }

  const updateProductHandler = (event) =>{
    setShow(false)
    event.preventDefault()
    let productName = event.target.product.value
    let productPrice = event.target.price.value
    let productDesc = event.target.description.value


      axios.put(`${baseUrl}/product/${editId}`,{
      names:productName ,
      price: productPrice  ,
      description: productDesc

    })
    .then((response) => {
      console.log(response);
      alert("Your Product got updated check it out.")
      window.location.reload()
     
    }, (error) => {
      console.log(error);
    });

    
  



  }


  const getProductHandlerOnId = () =>{
    setShow1(true)
    axios.get(`${baseUrl}/product/${searchId}`)
    .then((response) => {
      console.log(response);
      setSearchData(response.data.data)


     
    }, (error) => {
      console.log(error);
    });

  }

  



  return (
    <div className='main-div'>
      <div >
      <Navbar bg="dark" expand="lg" >
      <Container fluid className='nav' >
        <Navbar.Brand className='nav-a'>Product App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           
          </Nav>
          <Form className="d-flex">
          <input type="number" className='input' placeholder='Enter Product Id' onChange={(e) =>{
            setSearchId(e.target.value)
             }} />

            <Button variant="outline-success" onClick={getProductHandlerOnId} >Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        


      </div>
  

      <div className='add' id='add'>
        <Button variant='primary' onClick={addShow}>Add Product</Button>

      </div>
       <div className='alert-div' id='alert'>
        <div className='show-alert'>
          <Alert variant="success">
            <Alert.Heading>Hurrah!</Alert.Heading>
            <p>
              You have successfully added the product. Your product details are: <br /> <br />
              Name: {data?.names} <br />
              Price: {data?.price} <br />
              Description: {data?.description}
        
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={successHandler} variant="outline-success">
                Ok.
              </Button>
            </div>
          </Alert>
        </div>

    
      </div>
     

      <div className='input-div' id='input'>
        <form onSubmit={submitHandler}>
          <input type="text" name="productName" id="name" placeholder='Enter Product Name '  /> <br />

          <input type="text" name="price" id="price" placeholder='Enter Product Price'  /> <br />

          <textarea name="description" id="" cols="80" rows="5" placeholder='Enter Product Description...'></textarea>

          <Button variant="outline-success" type='submit' className='btn' onClick={alertHandler}>Add Product</Button>
          <Button variant="outline-info" className='btn' onClick={allProductsHandler}>Get All Products</Button>{' '}


        </form>
      </div>

      <div className='onSearchDisplay'>
       

        {/* <button onClick={getProductHandlerOnId}>
          Get

        </button> */}

      </div>


        





      <div className='display-div' id='display'>


        {

              (allData.length !== 0)?
                  <div className='table'>

                  
                    <Table responsive="xl"  striped bordered hover variant="dark"  >
                      <thead>
                        <tr>
                          <th>#ID</th>
                          <th>Product Name</th>
                          <th>Product Price</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                     { allData.map((eachData,i) => (  
                      
                     <tbody key={i}>
                        <tr>
                          <td>{eachData?.id}</td>
                          <td>{eachData?.names}</td>
                          <td>{eachData?.price}</td>
                          <td>{eachData?.description}
                          <button onClick={()=>{
                            deleteProductHandler(eachData?.id)

                          }}>Delete</button>

                          <button onClick={()=>{
                          handleData(
                            setEditId(eachData.id),
                            setEditName(eachData?.names),
                            setEditPrice(eachData?.price),
                            setEditDesc(eachData?.description)
                        )

                          }}>Update</button>



                          </td>
                        </tr>


                        
                     
                      </tbody>
                      ))}

                    
                    </Table>


                  </div>
              

                :
                <Alert variant="danger" style={{marginTop: "10px"}} onClose={() => setShow(false)} >
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                  There is nothing to show you. Your Product list is empty. You should add
                  some product first.
                 
                </p>
              </Alert>
                    

        

              
        }


      

        <div className='modal-div'>
          <Modal
            show={show}
            backdrop="static"
            keyboard={false}
          >
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={updateProductHandler} >
                <input type="text" defaultValue = {editName} name = "product"
              
                />
                <br />
              
            
          
                <input type="text" defaultValue = {editPrice} name = "price"
                  
                />
                <br />
                <textarea name="description" id="" cols="80" rows="5" defaultValue={editDesc} 
                 
                ></textarea>
              <Button variant="primary" type='submit' >Save Changes</Button>

            </form>


           
          </Modal.Body>

          <Modal.Footer>

          </Modal.Footer>
        </Modal>

        </div>

      </div>


      <div className='onSearchData'>
        
          <Modal
            show={show1}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Your Data of id: {searchData?.id} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
             
             <p>Name: {searchData?.names}</p>
             <p>Price: {searchData?.price}</p>
             <p>Description: {searchData?.description}</p>

             

            
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Ok.
              </Button>
            </Modal.Footer>
          </Modal>

      </div>

     




      

    </div>
    
  );
}

export default App;
