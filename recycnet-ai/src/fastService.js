import axios from 'axios';
 

async function classify(file) {

  const formData = new FormData();
  formData.append("file", file);

  const result = await axios.post(process.env.REACT_APP_API, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })

  return result.data
}

export default classify;