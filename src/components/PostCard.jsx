// import appwriteService from "../appwrite/config";
// import { Link } from "react-router-dom";

// //eslint-disable-next-line
// function PostCard({ $id, title, FeaturedImage }) {
//   //$id is appwrite syntax
//   return (
//     <Link to={`/post/${$id}`}>
//       <div className="w-full bg-gray-100 rounded-xl p-4">
//         <div className="w-full justify-center mb-4">
//           <img
//             src={appwriteService.getFilePreview(FeaturedImage)} //image ka preview
//             alt={title}
//             className="rounded-xl"
//           />
//         </div>
//         <h2 className="text-xl font-bold">{title}</h2>
//       </div>
//     </Link>
//   );
// }

// export default PostCard;

import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, FeaturedImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(FeaturedImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
