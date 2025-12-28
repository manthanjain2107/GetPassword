import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid'


const Manager = () => {
  const ref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    //  let passwords = localStorage.getItem("passwords");
    // if (passwords) {
    //   setpasswordArray(JSON.parse(passwords))
    // }
    let passwords = await req.json();
    setpasswordArray(passwords)
    console.log(passwords)
  }

  useEffect(() => {
    getPasswords()

  }, [])


  const showPassword = () => {
    const passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      ref.current.src = "/icons/eye.png";
    } else {
      passwordInput.type = "password";
      ref.current.src = "/icons/eyecross.png";
    }
  };


  const savePassword = async () => {
  if (form.site.length > 3 && form.password.length > 3 && form.username.length > 3) {
    let newId = form.id || uuidv4();   // use existing id if editing, otherwise new

    // if editing, remove the old record
    if (form.id) {
      await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({  id:form.id }) })
    }

    const newEntry = { ...form, id: newId };

    // update UI immediately
    setpasswordArray([...passwordArray, newEntry]);

    // save to DB
    await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({ ...form, id: uuidv4() }) })

    setform({ site: "", username: "", password: "" });
    toast.success('Password saved');
  } else {
    toast.error('Error : Too short !');
  }
}


  const deletePassword = async(id) => {
    const c = confirm('Are you sure want to DELETE it')
    if (c) {
      setpasswordArray(passwordArray.filter(i => i.id != id))
      await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({  id }) })
      // console.log('Deleting password with', id)
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id != id)))
      toast.warn('Deleting . . . ');
    }
  }

  const editPassword = (id) => {
    console.log('Editing password with', id)
    setform({...passwordArray.filter(i => i.id === id)[0], id : id})
    setpasswordArray(passwordArray.filter(i => i.id != id))
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const copyText = (text) => {
    toast.info('Copy to clipboard ');
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <div className="fixed inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-40 opacity-20 blur-[100px]"></div>
      </div>

      <div className=" p-4 md:px-40 py-18">

        <h1 className='text-4xl font-bold text-center'>

          <div className="logo font-bold text-2xl">
            <span className="text-green-600">&lt; </span>
            get
            <span className="text-green-600">Pass / &gt; </span>

          </div>
        </h1>
        <p className='text-green-900 text-center text-sm '>Your own Password Manager</p>
        <form onSubmit={(e) => {
          e.preventDefault();   // prevent page refresh
          savePassword();
        }}>
          <div className='text-black  flex flex-col pl-4 pt-4 pr-4  gap-8 items-center container mx-auto max-w-2xl'>
            <input value={form.site} onChange={handleChange} placeholder='Enter website url' className=' bg-white rounded-full border border-green-500 w-full px-4 text-sm py-0.5' type="text" name="site" id="site" />
            <div className="flex flex-col md:flex-row w-full gap-8" >
              <input value={form.username} onChange={handleChange} placeholder='Enter username' className=' bg-white rounded-full border border-green-500 w-full px-4 text-sm py-0.5' type="text" name="username" id="username" />

              <div className='relative'>
                <input value={form.password} onChange={handleChange} placeholder='Enter password' className=' bg-white rounded-full border border-green-500 w-full px-4 text-sm py-0.5' type="password" name="password" id="password" />
                <span className='absolute right-0 top-2 cursor-pointer' onClick={showPassword}>
                  <img ref={ref} src="/icons/eyecross.png" alt="show" className='px-2' width={30} />
                </span>
              </div>

            </div>
            <div>
              <button type="submit" className=' cursor-pointer flex justify-center gap-3 items-center text-sm bg-green-500 hover:bg-green-400  rounded-full px-3 py-0.5 w-30 h-8  border border-green-900'>
                <lord-icon style={{ "width": "18px", "height": "18px" }} src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
                Save  </button>
            </div>
          </div>
        </form>
        <div className="passwords container mx-auto max-w-4xl">
          <h2 className='font-bold text-lg py-3'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 &&
            <table className="table-auto w-full text-sm rounded-md overflow-hidden">
              <thead className='bg-green-800 text-white '>
                <tr>
                  <th className='p-2'>Site</th>
                  <th className='p-2'>Username</th>
                  <th className='p-2'>Passwords</th>
                  <th className='p-2'>Action</th>
                </tr>
              </thead>
              <tbody className='bg-green-100'>

                {passwordArray.map((item, index) => {
                  return <tr key={index}>
                    <td className='px-3 py-2 border border-white text-center w-100 '>
                      <div className='flex items-center justify-center'>
                        <a href={item.site} target='_blank'>{item.site}</a>

                        <div className='size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                          <lord-icon style={{ "width": "18px", "height": "18px", "paddingTop": "3px", "paddingLeft": "3px" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" title="Copy">  </lord-icon>
                        </div>
                      </div>
                    </td>

                    <td className=' border border-white text-center w-50 '>
                      <div className='flex  justify-center items-center'><span>{item.username}</span>
                        <div className='size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                          <lord-icon style={{ "width": "18px", "height": "18px", "paddingTop": "3px", "paddingLeft": "3px" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" title="Copy">  </lord-icon>
                        </div>
                      </div>
                    </td>

                    <td className=' border border-white text-center w-50 '>
                      <div className='flex justify-center items-center'><span>{"*".repeat(item.password.length)}</span>
                        <div className='size-7 cursor-pointer ' onClick={() => { copyText(item.password) }}>
                          <lord-icon style={{ "width": "18px", "height": "18px", "paddingTop": "3px", "paddingLeft": "3px" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" title="Copy">  </lord-icon>
                        </div>
                      </div>
                    </td>

                    <td className=' border border-white text-center w-25 cursor-pointer'>
                      <div className='flex justify-center items-center gap-2'>
                        <div onClick={() => { editPassword(item.id) }}><lord-icon style={{ "width": "18px", "height": "18px", }} src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" title="Edit">  </lord-icon>
                        </div>
                        <div onClick={() => { deletePassword(item.id) }}><lord-icon style={{ "width": "18px", "height": "18px", }} src="https://cdn.lordicon.com/skkahier.json" trigger="hover" title="Delete">  </lord-icon>
                        </div>
                      </div>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>}
        </div>

      </div>
    </>
  )
}

export default Manager
