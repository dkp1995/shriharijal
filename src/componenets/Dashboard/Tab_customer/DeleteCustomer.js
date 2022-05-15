import React from 'react'

function DeleteCustomer() {

  return (

    <div>
            <div>
                  <form>
              
                    <h3>Parmanently Delete a Customer </h3>

                    <input type="text" name="address" id="email" placeholder='Customer Name'></input>

                    <button type="button" className='calculate'>Delete</button>

                </form>
          </div>

    </div>
  )
}

export default DeleteCustomer