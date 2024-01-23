import Input from "../../UI/Input/Input";

export default function FormSearch({onSearch}){

  function handleSearchTerm(event){
    onSearch(event.target.value)
  }

  function handleSubmit(event){
    event.preventDefault();
  }
  return <form onSubmit={handleSubmit}>
    <Input
    title='Search'
    input={{
      type: 'text',
      name: 'search',
      onChange: handleSearchTerm
    }}
     />
  </form>
}