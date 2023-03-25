import React,{useState, useEffect} from 'react'
import { MDBDataTable } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { useContactContext } from '../../../context/ContactContext';

const AllContacts = () => {
    const [tableData, setTableData] = useState();
    const{contacts, dispatch} = useContactContext()

    const dltHandler = async(id)=>{

     const response =  await fetch(`/contact/${id}`, {
      method: 'DELETE',
     })

     const json = await response.json()

     if(response.ok){
      dispatch({type:'deleteWorkout', payload:id})
      
     }
  }

    const columnData = [
      {
        label: "Contact Name",
        field: "contactName",
        sort: "asc",
        width: 200,
      },
      {
        label: "Contact Number",
        field: "contactNumber",
        sort: "asc",
        width: 200,
      },
      // {
      //   label: "Image",
      //   field: "image",
      //   sort: "asc",
      //   width: 150,
      // },
      {
        label: "Actions",
        field: "actions",
        sort: "asc",
        width: 200,
      }
    ];

    // const imageValue = (image)=>{
    //   if(!image || image===null || image===undefined) return 
    //     <img src = 'https://i.pinimg.com/736x/cd/37/03/cd3703387024fe7e3a8ffd800fb2fd37.jpg' alt = '' />
      
    //     const value = image
    //     console.log(value)
    //     return value
    // }

    useEffect(()=>{
      const fetchWorkouts = async()=>{
        const response = await fetch('/contact/')

        const json = await response.json()

        if(response.ok){
          dispatch({type:'SetContacts', payload:json})
        }
      }

      fetchWorkouts()
    },[])

    useEffect(()=>{
      let rowDataCollection = []
      contacts && contacts.forEach((item)=>{
        const newItem = {
          contactName:item.name,
          contactNumber:item.contactNumber,
          // image:<img src ={imageValue(item.image)}/>,
          actions:<div className='actionContainer'>
            <button className = 'material-symbols-outlined dltBtn' onClick = {()=>dltHandler(item._id)}>Delete</button>
            <button className = 'material-symbols-outlined editBtn'>Edit</button>
          </div>
        }
        rowDataCollection.push(newItem)
      })
      setTableData({
        columns:columnData, 
        rows:rowDataCollection
      })
    },[contacts])
  
    return (
      <div className="allContactsTable">
        <h3>All Contacts</h3>
        <MDBDataTable scrollX striped bordered data={tableData} maxHeight="200px"/>
      </div>
    );
  };
  
  export default AllContacts;