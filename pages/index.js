import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import React, {useState,useEffect} from 'react'




const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

const carat_from = 0.30, carat_to = 30.00, price_from = 100, price_to = 900000

    //generate carat range for slider
    var caratRangeArr = [];
    for (var e = '', t = [[0.18, 0.02], [1, 0.05], [2, 0.1], [2.5, 0.25], [4, 0.5], [10, 5], [20, 10], [carat_to]], i = carat_from, a = 0; a < t.length - 1; i += t[a][1]) {
        caratRangeArr.push(i.toFixed(2)), i >= t[a + 1][0] && a++;
    }

    var carat_array = [];
    const caratOptions = []
    var carat_step = 100 / (caratRangeArr.length - 1);
    caratRangeArr.map((element,index) =>{
        caratOptions.push(<option key={index} value={parseFloat(element)}>{element} ct</option>)
        if(index == 0){
            carat_array["min"] = parseFloat(carat_from);
        }else if(index == caratRangeArr.length - 1){
            carat_array["max"] = parseFloat(carat_to);
        }else{
            carat_array[(carat_step * index).toFixed(2)+'%'] = parseFloat(element);
        }
    })

    //convert array to object			
    const caratArr = JSON.parse(JSON.stringify(Object.assign({}, carat_array)));

var priceRangeArr = [];
    for (var e = '', t = [[100, 100], [2500, 500], [1e4, 1e3], [2e4, 2e3], [4e4, 5e3], [1e5, 1e4], [2e5, 5e4], [4e5, 1e5], [(price_to)]], i = (price_from)  , a = 0; a < t.length - 1; i += t[a][1]){
        priceRangeArr.push(i.toFixed(2)), i >= t[a + 1][0] && a++;
    }                  	
    priceRangeArr[priceRangeArr.length - 1] = price_to.toFixed(2);

    var price_array = [];
    const priceOptions = []
    var price_step = 100 / (priceRangeArr.length - 1);
    priceRangeArr.map((element,index) =>{
        priceOptions.push(<option key={index} value={parseFloat(element)}>£{numberWithCommas(parseInt(element))}</option>)
        if(index == 0){
            price_array["min"] = parseFloat(price_from);
        }else if(index == priceRangeArr.length - 1){
            price_array["max"] = parseFloat(price_to);
        }else{
            price_array[(price_step * index).toFixed(2)+'%'] = parseFloat(element);
        }
    })

    //convert array to object			
const priceArr = JSON.parse(JSON.stringify(Object.assign({}, price_array)));  

const ISSERVER = typeof window === "undefined";


    
  




export default function Home({ ndata }) {
  const initialRender = React.useRef(true);
  
  let d = {
    pLeft: ndata.price_total_from_in_currency,
      pRight: ndata.price_total_to_in_currency,
        cLeft: ndata.size_from,
          cRight: ndata.size_to,
            cutLeft: 0,
              cutRight: 4,
                colorLeft: 0,
                  colorRight: 10,
                    clarityLeft: 0,
                      clarityRight: 9,
                        fluorLeft: 0,
                          fluorRight: 4,
                            symmLeft: 0,
                              symmRight: 5,
                                polishLeft: 0,
                                  polishRight: 5,
                                    tableLeft: 0,
                                      tableRight: 88,
                                        depthLeft: 0,
                                          depthRight: 106.60,
                                            report: [],
                                              locate: [],
                                                shapes: []
  }


   

  
let [flag, setflag] = useState(false)
  function show(){
    setflag(pre => !pre)
  }


//   () => {
//     const localDat = JSON.parse(localStorage.getItem("items")) ;
//     return localDat? localDat:{}
// }
// const items = JSON.parse(localStorage.getItem('items'));
  let [Data, setData] = useState(d)

 
 

  
  useEffect(() => {  
  if (typeof window !== "undefined") {
    setData(localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : d)
    console.log("hii")
  }
  }, []);
  
  
  // useEffect(() => {

  //   if (typeof window === "undefined") { 
  //     localStorage.getItem('items')?localStorage.setItem('items', JSON.stringify(Data)):console.log("pop")
  //   }

  // }, [Data]);
  
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      localStorage.setItem('items', JSON.stringify(Data))
      console.log("pop")
    }
    },[Data]);
    
  

  

  function flip(item, arr) {
    
    setData(prevData => (prevData[arr].includes(item)?{
      ...prevData,
     [arr]: [...prevData[arr].slice(0, prevData[arr].indexOf(item)),...prevData[arr].slice( prevData[arr].indexOf(item)+1)]
      // [arr]: prevData[arr].splice(prevData[arr].indexOf(item),1)
    }:{ ...prevData,
      [arr]: [...prevData[arr], item]
    }))
    

    
  }



  function handleChange(l, r, event) {

     setData((prevData) => ({
      ...prevData,
      [l]: event[0],
      [r]: event[1]
     }))
    
  }

  function handle(p, event) {
    const { value } = event.target
    setData(prevData => ({
      ...prevData,
      [p]: (value)
    }))

  }


  let shapes = ['round','princess','cushion','asscher','marquise','oval','radiant','pear','emerald','heart']
  let  s = shapes.map(item => {
   return(
   <div className={`w-[70px] inline-block text-center cursor-pointer ${Data.shapes.includes(item)?"border-black border ":" none"}`}>
      <Image
          src = {`/images/shapes/${item}.png`}
          width={30}
          height={30}
         alt="Picture of the author"
         onClick={() => flip(item,"shapes")}
        />
     </div>
     
   ) 
 })
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>   
     <Image
      src='/images/Flawless-Logo.png'
      alt="Picture of the author"
      width={300}
      height={100}
    />
   </div>

   <div className='mx-auto flex w-[60%] justify-between'>
     <div className='w-[47%]'>
       <div className='flex items-center mt-[30px]'>
         <div>SHAPE</div>
         <div className='ml-[10px] flex w-[100%] justify-between'>{s}</div>
           
       </div>
       <div className='flex justify-between mt-[50px]'>
       <div>CARAT</div>
       <div className='w-[100%] ml-[20px]'>
              <Nouislider 
                 snap={true}
                range={caratArr}
                start={[Data.cLeft, Data.cRight]}
                onChange={(e) => handleChange('cLeft', 'cRight', e)}
                connect
              />
          <span className="left_20"></span>
             
       <div className='flex justify-between mt-[20px]'>
                <select onChange={(e) => handle('cLeft', e)}  value={parseFloat(Data.cLeft)}>
                  {caratOptions}
                  
        </select>
        <select onChange={(e) => handle('cRight',e)}  value={parseFloat(Data.cRight)} >
                  {caratOptions}
                  
        </select>
       </div>
       </div>
     </div>

     <div className='flex justify-between mt-[40px]'>
       <div>COLOR</div>
            <div className='w-[100%] ml-[20px]'>
              <div className='relative'>
                   <Nouislider
                range={{ min: 0 , max: 10 }}
                start={[Data.colorLeft, Data.colorRight]}
                onChange={(e) => handleChange('colorLeft', 'colorRight', e)}
                step={1}
                // tooltips={[true, true]}
                  margin={1}
                connect
                />
                
                 <span className='absolute top-[-10px] left-[37px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[74px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[111px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[148px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[185px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[222px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[259px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[296px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[333px] z-50 text-[#ffffff] w-[12px]'>|</span>
              

              </div>
             
       <div className='flex  mt-[20px] text-[18px]  justify-around'>
       <div >M</div>
       <div>L</div>
       <div>K</div>
       <div>J</div>
       <div>I</div>
       <div>H</div>
       <div>G</div>
       <div>F</div>
       <div>E</div>
       <div>D</div>
       </div>
       </div>
     </div>
       
     </div>
     <div className='w-[47%]'>

     <div className='flex justify-between mt-[30px]'>
       <div>PRICE</div>
       <div className='w-[100%] ml-[20px]'>
              <Nouislider 
                snap={true}
                range={priceArr}
                start={[Data.pLeft, Data.pRight]}
                onChange = {(e) => handleChange('pLeft','pRight',e) }
                behaviour="tap"
      connect 
       />
       <div className='flex justify-between mt-[20px]'>
                <select onChange={(e) => handle('pLeft',e)} value={parseInt(Data.pLeft)} >
                  
          {priceOptions}
        </select>
        
                 <select onChange={(e) => handle('pRight',e)} value={parseInt(Data.pRight)} >
          {priceOptions}
        </select>
       </div>
       </div>
     </div>

     <div className='flex justify-between mt-[30px]'>
       <div>CUT</div>
            <div className='w-[100%] ml-[20px] '>
              <div className='relative'>
                <Nouislider
                range={{ min: 0 , max: 4 }}
                start={[Data.cutLeft, Data.cutRight]}
                onChange={(e) => handleChange('cutLeft', 'cutRight', e)}
                step={1}
                // tooltips={[true, true]}
                  margin={1}
                connect
                />
                <span className='absolute top-[-10px] left-[100px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[200px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[300px] z-50 text-[#ffffff] w-[12px]'>|</span>
              </div>
              
              <div className='flex justify-around mt-[20px] text-[12px]'>
      
       <div >Excellent</div>
       <div>Very Good</div>
       <div>Good</div>
       <div>Fair</div>
      
       </div>
       
            </div>
            
     </div>
       
     <div className='flex justify-between mt-[30px]'>
       <div>CLARITY</div>
            <div className='w-[100%] ml-[20px]'>
              <div className='relative'>
                   <Nouislider
                range={{ min: 0 , max: 9 }}
                start={[Data.clarityLeft, Data.clarityRight]}
                onChange={(e) => handleChange('clarityLeft', 'clarityRight', e)}
                step={1}
                // tooltips={[true, true]}
                  margin={1}
                connect
                />
                 <span className='absolute top-[-10px] left-[40px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[80px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[120px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[160px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[160px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[200px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[240px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[280px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[320px] z-50 text-[#ffffff] w-[12px]'>|</span>

              </div>
             
       <div className='flex justify-between mt-[20px]'>
       <div>I1</div>
       <div>SI3</div>
       <div>SI2</div>
       <div>SI1</div>
       <div>VS2</div>
       <div>VS1</div>
       <div>VVS2</div>
       <div>VVS1</div>
       <div>IF</div>
       </div>
       </div>
     </div>
      
     </div>
   </div>

<div ><button className='mx-auto block mt-[50px] mb-[50px]'  onClick={show}>advance filter</button></div>


   {(flag===true) && <div className='mx-auto flex w-[60%] justify-between'>
     <div className='w-[47%]'> 
       <div className='flex justify-between mt-[30px]'>
       <div>FLUOR</div>
       <div className='w-[100%] ml-[20px] '>
              <div className='relative'>
                <Nouislider
                range={{ min: 0 , max: 4 }}
                start={[Data.fluorLeft, Data.fluorRight]}
                onChange={(e) => handleChange('fluorLeft', 'fluorRight', e)}
                step={1}
                // tooltips={[true, true]}
                  margin={1}
                connect
                />
                <span className='absolute top-[-10px] left-[100px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[200px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[300px] z-50 text-[#ffffff] w-[12px]'>|</span>
              </div>
              
              <div className='flex justify-around mt-[20px] text-[12px]'>
      
       <div >Strong</div>
       <div>Medium</div>
       <div>Faint</div>
       <div>None</div>
      
       </div>
       
            </div>
     </div>

     <div className='flex justify-between mt-[30px]'>
       <div>SYMM</div>
        <div className='w-[100%] ml-[20px] '>
              <div className='relative'>
                <Nouislider
                range={{ min: 0 , max: 5 }}
                start={[Data.symmLeft, Data.symmRight]}
                onChange={(e) => handleChange('symmLeft', 'symmRight', e)}
                step={1}
                // tooltips={[true, true]}
                  margin={1}
                connect
                />
                <span className='absolute top-[-10px] left-[75px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[150px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[225px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[300px] z-50 text-[#ffffff] w-[12px]'>|</span>
              </div>
              
              <div className='flex justify-around mt-[20px] text-[12px]'>
      
       <div >Excellent</div>
       <div>Very Good</div>
       <div>Good</div>
       <div>Fair</div>
       <div>Poor</div>
      
       </div>
       
            </div>
     </div>

     <div className='flex justify-between mt-[30px]'>
       <div>TABLE</div>
       <div className='w-[100%] ml-[20px]'>
       <Nouislider 
       range={{min:0,max:88}}
       start={[Data.tableLeft, Data.tableRight]}
       onChange={(e)=>handleChange('tableLeft','tableRight',e)}
      //  tooltips= {[true,true]}
      connect 
       />
       <div className='flex justify-between mt-[20px]'>
                <input className='border-[1px] rounded border-[black] mr-[50px]'
                  type="number"
                  placeholder={Data.tableLeft}
                  value={Data.tableLeft}
                  onChange={(e) => handle('tableLeft', e)}
                />
        <input className='border-[1px] rounded border-[black] mr-[50px]'
                  type="number"
                  placeholder={Data.tableRight}
                  value={Data.tableRight}
                  onChange={(e) => handle('tableRight', e)}
                />
       </div>
       </div>
          </div>
          
          <div className='flex justify-between mt-[30px]'>
       <div>LOCATE</div>
       <div className='w-[100%] ml-[20px]'>
      
              <span className={`w-[70px] py-[5px] border border-black inline-block text-center mr-[4px] cursor-pointer ${Data.locate.includes("ALL")?"bg-black text-white":"bg-white text-black"}`} onClick={() => flip("ALL","locate")}>ALL</span>
              <span className={`w-[70px] py-[5px] border border-black inline-block text-center mr-[4px] cursor-pointer ${Data.locate.includes("UK")?"bg-black text-white":"bg-white text-black"}`} onClick={() => flip("UK","locate")}>UK</span>
              
              
       </div>
     </div>
       
     </div>
     <div className='w-[47%]'>

     <div className='flex justify-between mt-[30px]'>
       <div>REPORT</div>
       <div className='w-[100%] ml-[20px]'>
      
              <span className={`w-[70px] py-[5px] border border-black inline-block text-center mr-[4px] cursor-pointer ${Data.report.includes("GIA")?"bg-black text-white":"bg-white text-black"}`} onClick={() => flip("GIA","report")}>GIA</span>
              <span className={`w-[70px] py-[5px] border border-black inline-block text-center mr-[4px] cursor-pointer ${Data.report.includes("IGI")?"bg-black text-white":"bg-white text-black"}`} onClick={() => flip("IGI","report")}>IGI</span>
              <span className={`w-[70px] py-[5px] border border-black inline-block text-center mr-[4px] cursor-pointer ${Data.report.includes("AGS")?"bg-black text-white":"bg-white text-black"}`} onClick={() => flip("AGS","report")}>AGS</span>
              
       </div>
     </div>
       
     <div className='flex justify-between mt-[30px]'>
       <div>POLISH</div>
       <div className='w-[100%] ml-[20px] '>
              <div className='relative'>
                <Nouislider
                range={{ min: 0 , max: 5 }}
                start={[Data.polishLeft, Data.polishRight]}
                onChange={(e) => handleChange('polishLeft', 'polishRight', e)}
                step={1}
                // tooltips={[true, true]}
                  margin={1}
                connect
                />
                <span className='absolute top-[-10px] left-[75px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[150px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[225px] z-50 text-[#ffffff] w-[12px]'>|</span>
                <span className='absolute top-[-10px] left-[300px] z-50 text-[#ffffff] w-[12px]'>|</span>
              </div>
              
              <div className='flex justify-around mt-[20px] text-[12px]'>
      
       <div >Excellent</div>
       <div>Very Good</div>
       <div>Good</div>
       <div>Fair</div>
       <div>Poor</div>
      
       </div>
       
            </div>
     </div>

     <div className='flex justify-between mt-[30px]'>
       <div>DEPTH</div>
      <div className='w-[100%] ml-[20px]'>
       <Nouislider 
       range={{min:0,max:106.60}}
       start={[Data.depthLeft, Data.depthRight]}
       onChange={(e)=>handleChange('depthLeft','depthRight',e)}
      //  tooltips= {[true,true]}
      connect 
       />
       <div className='flex justify-between mt-[20px]'>
                <input className='border-[1px] rounded border-[black] mr-[50px]'
                  type="number"
                  placeholder={Data.depthLeft}
                  value={Data.depthLeft}
                  onChange={(e) => handle('depthLeft', e)}
                />
        <input className='border-[1px] rounded border-[black] mr-[50px]'
                  type="number"
                  placeholder={Data.depthRight}
                  value={Data.depthRight}
                  onChange={(e) => handle('depthRight', e)}
                />
       </div>
       </div>
     </div>
      
     </div>
   </div>}

    </div>

    
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://gems.netfillip.org/public/getfilter`)
  const ndata = await res.json()

  return { props: { ndata } }
}
