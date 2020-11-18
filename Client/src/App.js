import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, sendPost } from './Store/Reducer/PostSlice'
import { DeletePost, deletePost } from './Store/Reducer/DeletePostSlice'
import { UpdatePost, updatePost } from './Store/Reducer/PatchPostSlice'

function App() {
  const [posts, setposts] = useState([]);
  const [title, settitle] = useState('')
  const [updatevalue, setupdatevalue] = useState(false)
  const [updateid, setupdateid] = useState('')
  const [discription, setdiscription] = useState('')
  const dispatch = useDispatch();
  const postdata = useSelector(sendPost)
  const deletepost = useSelector(deletePost)
  const updatepost = useSelector(updatePost)
  console.log("==>", updatepost)

  //GET
  useEffect(() => {
    async function getData() {
      const response = await fetch('https://thawing-meadow-26600.herokuapp.com/posts')
      const data = await response.json();
      console.log(data)
      setposts(data)
    }
    getData();
  }, [postdata, deletepost, updatepost])


  const SendData = async (e, title, discription) => {
    e.preventDefault();
    const post = {
      title,
      discription
    }
    if (updatevalue) {
      const data = {
        id: updateid,
        post: {
          title,
          discription
        }
      }
      await dispatch(UpdatePost(data))
      setupdateid('')
      setupdatevalue(false)
    }
    else {
      await dispatch(createPost(post))
    }
    setdiscription('')
    settitle('')
  }

  const Updatedata = (pretitle, prediscription, preid) => {
    settitle(pretitle)
    setdiscription(prediscription)
    setupdatevalue(true)
    setupdateid(preid)
  }

  return (
    <div className="App">

      <form className='form' onSubmit={(e) => SendData(e, title, discription)}>
        <h2>ADD POSTS</h2>
        <input type='text' value={title} className="text" required placeholder='Enter Title'
          onChange={(e) => settitle(e.target.value)}
        />
        <input type='text' value={discription} className="text" required placeholder='Enter Discription'
          onChange={(e) => setdiscription(e.target.value)}
        />
        <br />
        <button type='submit' className='button'>Submit</button>
      </form>
      {
        posts.length ?

          <div className="postlist">
            <h2>POST LISTS</h2>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Discription</th>
                </tr>
              </thead>
              <tbody>
                {
                  posts.map((post) => (
                    <tr key={post._id}>
                      <td>{post.title}</td>
                      <td>{post.discription}</td>
                      <td className="tdbtn">
                        <button
                          onClick={() => dispatch(DeletePost(post._id))} className='btndelete' >
                          Delete
                  </button>
                        <button
                          onClick={() => Updatedata(post.title, post.discription, post._id)} className='btndelete' >
                          Edit
                  </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          : null}
    </div>
  );
}

export default App;
