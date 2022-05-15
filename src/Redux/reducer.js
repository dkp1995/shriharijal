const Reducer = (state = null , action) =>{

    switch(action.payload){

            case true : return true

            case false : return false

            default : return state

    }

}

export default Reducer