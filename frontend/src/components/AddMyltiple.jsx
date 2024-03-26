// import React, { useState } from "react";
// import { useStateContext } from "../context/ContextProvider";

// const AddMultiple = () => {
//   const { restaurant } = useStateContext();
//   const [imgs, setImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);

//   // Function to handle file selection
//   const handleFileSelect = (event) => {
//     const files = Array.from(event.target.files);
//     setImages((prevImages) => [...prevImages, ...files]); // Update imgs state with files directly
//     const previews = files.map((file) => URL.createObjectURL(file));
//     setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
//   };

//   const handleSubmit = () => {
//     console.log(imgs); // Handle submission with files stored in imgs state
//   };

//   return (
//     <div>
//       {/* Input field for selecting multiple files */}
//       <input type="file" multiple onChange={handleFileSelect} />

//       {/* Display image previews */}
//       {imagePreviews.map((preview, index) => (
//         <img
//           key={index}
//           src={preview}
//           alt={`Preview ${index}`}
//           style={{ maxWidth: "200px", maxHeight: "200px", margin: "5px" }}
//         />
//       ))}

//       {/* Button to handle submission */}
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// export default AddMultiple;
