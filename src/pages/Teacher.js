//1. Import Area

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";




//2. Defination Area
function Teacher() {
  //2.1 Hooks Area
  // const [variable,setVariable] = useState(initialValue);
  const [teachers,setTeachers] = useState([])
  const [payload,setPayload] = useState({
                                          "data": {
                                            "name": "Teacher3"
                                          }
                                        });
  const [teacherName,setTeacherName] = useState('');


  // useEffect is for page load
  // I want to call the api after the page load
  //useEffect(cbfn,arr);
  //cbfn = Callback function ()=>{}
  // arr = Array []
  useEffect(()=>{
    // What you write here will be executed after the pageload/compoent rendered

    fetch(`http://localhost:1337/api/teachers`)
    .then((res)=>{ 
      // this make res JSON readable
      return res.json()
    })
    .then((data)=>{
      console.log(data.data);
      let newaoo = data.data.map((cv,idx,arr)=>{
          return {
                      id:cv.id,
                      name:cv.attributes.name,
                      createdAt:cv.attributes.createdAt
                  }
      });
      setTeachers(newaoo);
    })
    .catch();

  },[]);
  //anil(actualArg1,actualArg2,....);
  //Every Hook is a function

  //2.2 Function defination area
  let sendData = ()=>{
    //alert('OKOKOKOKOKOK');
    fetch(`http://localhost:1337/api/teachers`,{
      "method":"POST",
      "headers":{
        //P:V
        "Content-Type": "application/json"
      },
      "body":JSON.stringify(payload)
    }).then((res)=>{
        //I want to convert the respone into json readable
        return res.json();
    }).then((data)=>{
      console.log(data);
      if(data){
        alert("Teacher Created Successfuly");
      }

    }).catch((err)=>{
      console.log(err);
    })
  }
  
  let changeValue = (event)=>{
    console.log(event.target.value);
    setTeacherName(event.target.value);
    console.log('HOOK teacherName',teacherName);
    
    setPayload({
      ...payload,
      data:{
        name:document.querySelector('input#teachername').value
      }
    });
  }

  let deleteTeacher = (e)=>{
    document.getElementById("loader").innerHTML = `<div className="d-flex justify-content-center">
                                                      <div className="spinner-border" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                      </div>
                                                    </div>`

    let x = e.target.closest('tr');
    console.log(e.target.closest('tr').querySelector('td:first-child').innerHTML);
    let delid = e.target.closest('tr').querySelector('td:first-child').innerHTML;
    let ans = window.confirm('Are you sure youDo you really want to delete');
    console.log(typeof ans);
    if(ans === true){

      //Call the DELETE REST API
      fetch(`http://localhost:1337/api/teachers/${delid}`,{
        method:"DELETE"
      })
      .then((res)=>{
        // This json() function make the incomming data json readable
        return res.json();
      })
      .then((data)=>{
          x.remove();
          console.log(data);
          document.getElementById("loader").innerHTML ='';
          window.alert('Deleted Successfully ');
      })
      .catch((err)=>{

      });

    }else{
      console.log('Not OK');
    }
  }

  //2.3 Return statement
  return (
      <>
        <div id="loader">
          
        </div>
        <div className="container">
          <h1>Create Teacher</h1>
          <form>
            <div className="mb-3">
                <label htmlFor="teachername" className="form-label">Teacher Name</label>
                <input type="text" className="form-control" id="teachername" name="name" onKeyUp={(e)=>{changeValue(e)}}  />               
            </div>
            <button type="button" className="btn btn-primary" onClick={()=>{sendData()}}>Submit</button>
          </form>
          <br />
          <hr />
          <hr />
          <br />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">CreatedAt</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                teachers.map((cv,idx,arr)=>{
                  return <tr key={idx}>
                            <td>{cv.id}</td>
                            <td>{cv.name}</td>
                            <td>{cv.createdAt}</td>
                            <td>
                              <button className="btn btn-success btn-sm">View</button>
                              <a href={`/editTeacher?id=${cv.id}&name=${cv.name}`} className="btn btn-success btn-sm">Edit</a>
                              <button className="btn btn-danger btn-sm" onClick={(e)=>{ deleteTeacher(e) }}>Delete</button>
                            </td>
                          </tr>
                })
              }
              
            </tbody>
          </table>
        </div>
      </>
  );
}

// 3. Export Area
export default Teacher;
