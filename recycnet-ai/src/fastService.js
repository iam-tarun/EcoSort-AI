import axios from 'axios';
 

async function classify(file) {

  const formData = new FormData();
  formData.append("file", file);

  const result = await axios.post("http://127.0.0.1:8000/classify", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })

  return result.data
}

export default classify;