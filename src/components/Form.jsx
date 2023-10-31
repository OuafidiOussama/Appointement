import { Icon } from '@iconify/react'
import data from '../data.json'
import { useState } from 'react'
import { v1 as uuidv1 } from 'uuid'
import Item from './Item';
import SelectInput from './Select'



export default function Form() {

    const [items , setItems] = useState(data)

    const [formData, setFormData] = useState({
        owner: '',
        pet: '',
        date: '',
        time: '',
        details: ''
    });

    const [searchItem, setSearchItem] = useState('')
    const [filteredItems, setFilteredItems] = useState(items)
    const [sortBy, setSortBy] = useState("petName"); 
    const [sortOrder, setSortOrder] = useState("asc");

    
    const deleteItem = (key) => {
        // console.log(key);
        let filteredItem = [...items].filter((item) => item.id !== key)
        setItems(filteredItem)
        setFilteredItems(filteredItem)
    }

    const addItem = () => {
        if (formData.owner && formData.pet && formData.date && formData.time && formData.details) {
            const newItem = {
                "id": uuidv1(),
                "petName": formData.pet,
                "ownerName": formData.owner,
                "aptNotes": formData.details,
                "aptDate": formData.date + " " + formData.time
            }
            
            setItems([...items,newItem])
            
            // setFormData({
            //     owner: '',
            //     pet: '',
            //     date: '',
            //     time: '',
            //     details: '',
            // });
        }
    }

    const Search = (e) => { 
        const searchFor = e.target.value;
        setSearchItem(searchFor)

        let filtered = items.filter((item) =>
            item.petName.toLowerCase().includes(searchFor.toLowerCase()) ||  item.ownerName.toLowerCase().includes(searchFor.toLowerCase())
        );

        filtered = filtered.sort((a, b) => {
            if (a[sortBy] && b[sortBy]) {
                if (sortOrder === "asc") {
                    return a[sortBy].localeCompare(b[sortBy]);
                } else {
                    return b[sortBy].localeCompare(a[sortBy]);
                }
            }
            return 0;
        });

        setFilteredItems(filtered);    
      }


      const handleSortChange = (selectedSortBy) => {
            setSortBy(selectedSortBy);
        
            if (selectedSortBy === sortBy) {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            } else {
                setSortOrder("asc");
            }
        
            setFilteredItems((prevFilteredItems) => {
                return [...prevFilteredItems].sort((a, b) => {
                    if (sortOrder === "asc") {
                        return a[sortBy].localeCompare(b[sortBy]);
                    } else {
                        return b[sortBy].localeCompare(a[sortBy]);
                    }
                });
            });
        };

    return (
        <>
            <div className='w-9/12 border-2 rounded-lg '>
            <div className='w-full h-10 bg-blue-400 text-white rounded-t-lg flex items-center'>
                <Icon className="text-lg mx-2" icon="mdi:calendar-add" />
                <p> Add Appointements </p>
            </div>
            <div className='w-full py-5 px-5 grid gap-5'>
                <div className='grid grid-cols-2 items-center gap-5 '>
                    <label>Owner Name</label>
                    <input className='border-2 rounded-md h-10 outline-none pl-5' type='text' onChange={e => setFormData({ ...formData, owner: e.target.value })}></input>
                    <label>Pet Name</label>
                    <input className='border-2 rounded-md h-10 outline-none pl-5' type='text' onChange={e => setFormData({ ...formData, pet: e.target.value })}></input>
                    <label>Apt Date</label>
                    <input className='border-2 rounded-md h-10 outline-none px-2' type='date' onChange={e => setFormData({ ...formData, date: e.target.value })}></input>
                    <label>Apt Time</label>
                    <input className='border-2 rounded-md h-10 outline-none px-2' type='time' onChange={e => setFormData({ ...formData, time: e.target.value })}></input>
                    <label className='self-start'>Appointment Notes</label>
                    <textarea className='border-2 rounded-md h-20 outline-none pl-2 resize-none' placeholder='Detailed comments about the condition' onChange={e => setFormData({ ...formData, details: e.target.value })}></textarea>
                </div>
                <button onClick={addItem} className='relative justify-self-end bg-blue-400 px-5 py-2 text-white rounded-xl'>Submit</button>
            </div>
            </div>

            <div className='w-9/12 mt-5 relative flex'>
            <input className='md:w-[65%] xl:w-[82.5%] border-2 h-10 rounded-lg outline-none pl-10' placeholder='Search' type='text' value={searchItem} onChange={Search}></input>
            <Icon icon="ep:search" className='text-xl text-gray-500 absolute top-[26%] left-2' />
            <SelectInput handleSortChange={handleSortChange} />
            </div>

            {filteredItems.map((item)=>(<Item key={item.id} item={item} deleteItem={deleteItem} />))}
            
        </>
    )
}