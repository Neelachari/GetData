import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const GetData = () => {
    const [data,setData]=useState([])
    const [originalData,setoriginalData]=useState([])
    const [catoGory,setcatoGory]=useState([])
    const [Page,setPage]=useState(1)
    const itemsperPage=8

    console.log("data", data)

    useEffect(()=>{
        getData()
    },[])



    const getData=()=>{
        axios.get(`https://dummyjson.com/products?limit=100`)
        .then((res)=> {
            setData(res.data.products)
            setoriginalData(res.data.products)
        })
    }




    const handleSort=(value)=>{
        if(value=="asc"){
            const sortData=[...data]
            sortData.sort((a,b)=> a.price-b.price)
            setData(sortData)
        }
        else if(value=="desc"){
            const sortData=[...data]
            sortData.sort((a,b)=> b.price-a.price)
            setData(sortData)

        }
        else{
           getData()
        }
        setPage(1)

    }


    const handleChange=(value)=>{
        const filterData=catoGory.includes(value)
        ? catoGory.filter((c)=> c!== value) : [...catoGory,value]
        setcatoGory(filterData)

        if(filterData.length>0){
            const filterOutData= originalData.filter((c)=> filterData.includes(c.category))
            setData(filterOutData)
        }
        else{
            setData([...originalData])
        }

    }

    const lastIndexitem=Page*itemsperPage
    const firstIndexitem=lastIndexitem-itemsperPage
    const currentPgaeData=data.slice(firstIndexitem,lastIndexitem)

    const TotalPage=Math.ceil(data.length/itemsperPage)



    const handlePrev=()=>{
        if(Page>1){
            setPage(Page -1)
        }

    }

    const handleNext=()=>{
        if(Page<TotalPage){
            setPage(Page +1)
        }
    }

  return (
    <div style={{display:"flex", width:"100%"}}>
        <div style={{width:"10%", textAlign:"left"}}>
          <div>
            <h3>Sort by Price</h3>
            <select onChange={(e)=> handleSort(e.target.value)}>
                <option value="">Select</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
            </select>
          </div>

          <div>
            <h4>Filter by Category</h4>
            <div>
                <lable>
                    <input type="checkbox" value={'beauty'} onChange={()=> handleChange('beauty')} />
                    Beauty
                </lable>
            </div>

            <div>
                <lable>
                    <input type="checkbox" value={'fragrances'} onChange={()=> handleChange('fragrances')} />
                    Fragrances
                </lable>
            </div>

            <div>
                <lable>
                    <input type="checkbox" value={'groceries'} onChange={()=> handleChange('groceries')} />
                    Groceries
                </lable>
            </div>

            <div>
                <lable>
                    <input type="checkbox" value={'home-decoration'} onChange={()=> handleChange('home-decoration')} />
                    Decoration
                </lable>
            </div>
          </div>
        </div>
        <hr />
        <div style={{width:"88%"}}>
            <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"10px"}}>
                {currentPgaeData?.map((e)=> 
                
                <div style={{border:"2px solid gray"}} key={e.id}>
                    <img width={"80%"} src={e.thumbnail} alt={e.title} />
                    <h5>{e.title}</h5>
                    <h6>{e.category}</h6>
                    <h4>{e.price}</h4>
                </div>
                
                )}
            </div>
            <div>
                <button onClick={handlePrev} disabled={Page==1}>Prev</button>
                <span>{Page} /{TotalPage}</span>
                <button onClick={handleNext} disabled={Page==TotalPage}>Next</button>
            </div>
        </div>
    </div>
  )
}
