import { gql, useMutation } from "@apollo/client";

interface UpdateProjectResponse {
  updateProject: {
    id: string;
    title: string;
  };
}

interface UpdateProjectVariables {
  id: string;
  title: string;
}

const CreateProject = gql`
  mutation CreateProject {
    createProject {
      title
      bio
      content
      urls
      imageUrls
      category
    }
  }
`;

// function UpdateProjectForm() {
//   const [createProject, { data, loading, error }] = useMutation<
//     UpdateProjectResponse,
//     UpdateProjectVariables
//   >(CreateProject);

//   const handleUpdate = async () => {
//     try {
//       const response = await createProject({
//         variables: { id: '1', title: 'Updated Project Title' },
//       });
//       console.log('Mutation Response:', response.data);
//     } catch (err) {
//       console.error('Mutation Error:', err);
//     }
//   };

//   if (loading) return <p>Updating...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <button onClick={handleUpdate}>Update Project</button>
//       {data && <p>Updated Project: {data.updateProject.title}</p>}
//     </div>
//   );
// }

// export default UpdateProjectForm;
