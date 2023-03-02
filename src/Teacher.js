//1. Import Area

import { useEffect, useState } from "react";




//2. Defination Area
function Teacher() {
  //2.1 Hooks Area

  // const [variable,setVariable] = useState(initialValue);
  const [teachers,setTeachers] = useState([
                                            {
                                              id:1,
                                              name:'Anil',
                                              createdAt:'123123'
                                            },
                                            {
                                              id:2,
                                              name:'Sunil',
                                              createdAt:'1829873'
                                            }
                                          ])

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


  //2.3 Return statement
  return (
      <>
        <div className="container">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <br />
          <hr />
          <hr />
          <br />
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">CreatedAt</th>
              </tr>
            </thead>
            <tbody>
              {
                teachers.map((cv,idx,arr)=>{
                  return <tr>
                            <td>{cv.id}</td>
                            <td>{cv.name}</td>
                            <td>{cv.createdAt}</td>
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
