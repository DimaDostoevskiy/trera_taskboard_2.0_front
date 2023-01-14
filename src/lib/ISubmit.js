export default (e, submitAction) => {
    if(e.key === "Enter"){
        submitAction();
    }
}