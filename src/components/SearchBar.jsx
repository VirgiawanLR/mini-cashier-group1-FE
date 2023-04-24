import { useState } from "react"
function SearchBar() {

    const fruits = []

    const [search, setSearch] = useState("")

    const renderList = () => {
        return fruits.filter((fruit) => {
            return fruit.toLowerCase().includes(search.toLowerCase())
        }).map((fruit) => {
            return <div>
                <p className=" text-black bg-yellow-500 rounded-lg p-5 ">{fruit}</p>
            </div>
        })
    }

    const inputHandler = (event) => {
        setSearch(event.target.value)
    }


    return (
        <div>

            <div className="flex flex-col justify-center gap-3 w-1/4">
                <input type="text"
                    className="px-3 bg-white text-dark shadow-md text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={inputHandler}
                    placeholder="Search..." />

                {/* {renderList()} */}

            </div>

        </div>
    )
}

export default SearchBar