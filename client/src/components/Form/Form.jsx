function Form({
	children, 
	id, 
	type='submit', 
	onSubmit}) {

return (
<form 
id={id}
type={type}
onSubmit={onSubmit}>
	{children}
</form>
)
}

export default Form;