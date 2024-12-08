"use client"
import React, { useEffect, useState, useRef } from 'react';
import useWebSocket from 'react-use-websocket';
import { v4 as uuidv4 } from 'uuid';
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd"
import { drawRect } from "../Components/utilities";

const VideoStream = () => {
  const [itemCounts, setItemCounts] = useState({});
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const mediaRecorderRef1 = useRef(null);
  const mediaRecorderRef2 = useRef(null);
  const mediaRecorderRef3 = useRef(null);
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);
  const canvasRef3 = useRef(null);
  const [isRecording1, setIsRecording1] = useState(false);
  const [isRecording2, setIsRecording2] = useState(false);
  const [isRecording3, setIsRecording3] = useState(false);
  const [devices, setDevices] = useState([]);
  const [detaillist, setdetaillist] = useState([]);
  const [selectedDeviceId1, setSelectedDeviceId1] = useState(null);
  const [selectedDeviceId2, setSelectedDeviceId2] = useState(null);
  const [selectedDeviceId3, setSelectedDeviceId3] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [productInfo, setProductInfo] = useState({
    brandName: "Brand not available",
    mrpValue: "MRP not available",
    expiryDate: "Expiry date not available",
    freshStatus: "Freshness status not available",
    confidence: "Confidence not available",
    description: "Type of the Object",
  });
  const [model, setModel] = useState(null);
  const URL = "http://localhost:8080"
  const [isReloading,setReloading] = useState(false);

  useEffect(() =>{
   console.log("the item count is",itemCounts)
  },[itemCounts])
  
  const handleClick = async () => {
      try {
        const response = await fetch(`${URL}/api/v1/form/list?page=1&size=50`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { result } = await response.json();
        console.log(result.length);
        setdetaillist(result)
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    setReloading(true);
    setTimeout(() => {
      setReloading(false);
    }, 2000);
  };

  const getslots = async () => {
    try {
      console.log("the data list is",imageList)
      const raw = JSON.stringify(imageList);
      const response = await fetch(`${URL}/api/v1/form/fill`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: raw,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { result } = await response.json();
      console.log(result.length);
      setImageList([]);
      if (result.length > 0) {
        const itemInfo = result[0]
  
        const updatedProductInfo = {
          brandName: itemInfo.name || "Brand not available",
          mrpValue: itemInfo.mrp || "MRP not available",
          expiryDate: itemInfo.expiry_date || "Expiry date not available",
          freshStatus: itemInfo.freshStatus || "Freshness status not available",
          confidence: itemInfo.confidence ? parseFloat(itemInfo.confidence).toFixed(2) : "Confidence not available",
          description: itemInfo.description || "Type of the Object",
        };
  
        setProductInfo(updatedProductInfo);
      }
      console.log(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  
  const { sendMessage: sendMessage1, lastMessage: lastMessage1 } = useWebSocket('ws://127.0.0.1:8080/api/v1/form/ws', {
    onOpen: () => console.log('WebSocket 1 connection opened.'),
    onClose: () => console.log('WebSocket 1 connection closed.'),
    onError: (event) => console.error('WebSocket 1 error:', event),
  });
  
  const { sendMessage: sendMessage2, lastMessage: lastMessage2 } = useWebSocket('ws://127.0.0.1:8080/api/v1/form/ws', {
    onOpen: () => console.log('WebSocket 2 connection opened.'),
    onClose: () => console.log('WebSocket 2 connection closed.'),
    onError: (event) => console.error('WebSocket 2 error:', event),
  });
  
  const { sendMessage: sendMessage3, lastMessage: lastMessage3 } = useWebSocket('ws://127.0.0.1:8080/api/v1/form/ws', {
    onOpen: () => console.log('WebSocket 3 connection opened.'),
    onClose: () => console.log('WebSocket 3 connection closed.'),
    onError: (event) => console.error('WebSocket 3 error:', event),
  });
  
  useEffect(() => {
    // Skip on server-side
    if (typeof window === 'undefined') return;
  
    let mounted = true;
    let stream = null;
  
    const getCameras = async () => {
      try {
        // Request camera permissions first
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: true 
        });
  
        if (!mounted) {
          stopStream();
          return;
        }
  
        // Get available devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
  
        if (mounted) {
          setDevices(videoDevices);
          setSelectedDeviceId1(videoDevices.length > 0 ? videoDevices[0].deviceId : null);
          setSelectedDeviceId2(videoDevices.length > 1 ? videoDevices[1].deviceId : null);
          setSelectedDeviceId3(videoDevices.length > 2 ? videoDevices[2].deviceId : null);
        }
      } catch (error) {
        console.error('Camera access error:', error);
        if (mounted) {
          setDevices([]);
        }
      }
    };
  
    const stopStream = () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  
    getCameras();
  
    return () => {
      mounted = false;
      stopStream();
    };
  }, []);
  
  useEffect(() => {
    if (lastMessage1) {
      const vid1 = lastMessage1.data;    
      try {
          const parsedVid1 = JSON.parse(vid1);
          console.log("Parsed object:", parsedVid1);

          if (parsedVid1 && parsedVid1.img && Array.isArray(parsedVid1.img)) {
              console.log("List is coming", parsedVid1.img);
              setImageList(prevImageList => [...prevImageList, ...parsedVid1.img]);
          } else {
              console.log("No 'img' field found or it's not an array");
          }
      } catch (error) {
          console.error("Error parsing JSON:", error);
      }
      console.log('Message from camera 1:', lastMessage1.data);
    }
  }, [lastMessage1]);
  
  useEffect(() => {
    if (lastMessage2) {
      console.log('Message from camera 2:', lastMessage2.data);
      const vid1 = lastMessage2.data;    
      try {
          const parsedVid1 = JSON.parse(vid1);
          console.log("Parsed object:", parsedVid1);

          if (parsedVid1 && parsedVid1.img && Array.isArray(parsedVid1.img)) {
              console.log("List is coming", parsedVid1.img);
              setImageList(prevImageList => [...prevImageList, ...parsedVid1.img]);
          } else {
              console.log("No 'img' field found or it's not an array");
          }
      } catch (error) {
          console.error("Error parsing JSON:", error);
      }
    }
  }, [lastMessage2]);
  
  useEffect(() => {
    if (lastMessage3) {
      console.log('Message from camera 3:', lastMessage3.data);
      const vid1 = lastMessage3.data;
      try {
        const parsedVid1 = JSON.parse(vid1);
        console.log("Parsed object:", parsedVid1);

        if (parsedVid1 && parsedVid1.img && Array.isArray(parsedVid1.img)) {
            console.log("List is coming", parsedVid1.img);
            setImageList(prevImageList => [...prevImageList, ...parsedVid1.img]);
        } else {
            console.log("No 'img' field found or it's not an array");
        }
    } catch (error) {
        console.error("Error parsing JSON:", error);
    }
    }
  }, [lastMessage3]);
  
  const runCoco = async () => {
    const net = await cocossd.load() // eslint-disable-next-line
    setModel(net)
  }
  const startStreaming = async (videoRef, deviceId, mediaRecorderRef, sendMessage ,isRecording,canvasRef) => {
    if (!deviceId) return;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: { exact: deviceId },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 60 },
        },
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
        
      const video = videoRef.current;
      const detectFrame = async () => {
        if (video && model && canvasRef.current) {
            try {
                const videoWidth = video.videoWidth;
                const videoHeight = video.videoHeight;
    
                canvasRef.current.width = videoWidth;
                canvasRef.current.height = videoHeight;
    
                const predictions = await model.detect(video);
                // console.log(predictions);
    
                const ctx = canvasRef.current.getContext("2d");
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
                // Draw the detected objects on the main canvas
                drawRect(predictions, ctx);
    
                const detectedClasses = ["bottle", "cup", "apple", "banana"];
                const detectedBoxes = predictions.filter(prediction =>
                    detectedClasses.includes(prediction.class)
                );

                const newCounts = {};
                detectedBoxes.forEach(box => {
                  const itemClass = box.class;
                  newCounts[itemClass] = (newCounts[itemClass] || 0) + 1;
                });
                setItemCounts(newCounts);
    
                for (const box of detectedBoxes) {
                    const [x, y, width, height] = box['bbox'];
                    
                    // Create a new canvas for cropping the detected area
                    const croppedCanvas = document.createElement('canvas');
                    croppedCanvas.width = width;
                    croppedCanvas.height = height;
    
                    const croppedCtx = croppedCanvas.getContext('2d');
    
                    // Draw the cropped region from the video directly (not from the main canvas)
                    croppedCtx.drawImage(
                        video, 
                        x, y,             
                        width, height,     
                        0, 0,             
                        width, height   
                    );
    
                    // Get the cropped frame data as a JPEG image
                    const frameData = croppedCanvas.toDataURL("image/jpeg");
    
                    // Send frame data via WebSocket
                    sendMessage(JSON.stringify({ image: frameData, class: box['class'] }));
                }
    
                const fps = 60;
                const delay = 5000 / fps;
                setTimeout(() => {
                    requestAnimationFrame(detectFrame);
                }, delay);
    
            } catch (err) {
                console.error('Error during detection:', err);
            }
        } else {
            console.error('canvasRef.current is null or not yet initialized.');
        }
    };
      
  
      video.onloadeddata = () => {
        detectFrame();
      };
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          // sendMessage(event.data);
        }
      };  

      if (isRecording) {
        mediaRecorder.start(100);
      } else if (mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  };

  useEffect(()=>{
  runCoco()
  },[])

  useEffect(() => {
    if (isRecording1) {
      startStreaming(videoRef1, selectedDeviceId1, mediaRecorderRef1, sendMessage1,isRecording1,canvasRef1);
    } else {
      if (mediaRecorderRef1.current && mediaRecorderRef1.current.state !== 'inactive') mediaRecorderRef1.current.stop();
    }
    return () => {
      [mediaRecorderRef1].forEach((ref) => {
        if (ref.current && ref.current.state !== 'inactive') ref.current.stop();
      });

      [videoRef1].forEach((ref) => {
        if (ref.current && ref.current.srcObject) {
          const stream = ref.current.srcObject;
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      });
    };
  }, [isRecording1]);

  useEffect(() => {

    if (isRecording2) {
      startStreaming(videoRef2, selectedDeviceId2, mediaRecorderRef2, sendMessage2,isRecording2,canvasRef2);
    } else {
      if (mediaRecorderRef2.current && mediaRecorderRef2.current.state !== 'inactive') mediaRecorderRef2.current.stop();
    }
    return () => {
      [mediaRecorderRef2].forEach((ref) => {
        if (ref.current && ref.current.state !== 'inactive') ref.current.stop();
      });

      [ videoRef2].forEach((ref) => {
        if (ref.current && ref.current.srcObject) {
          const stream = ref.current.srcObject;
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      });
    };
  }, [isRecording2]);
  useEffect(() => {

    if (isRecording3) {
      startStreaming(videoRef3, selectedDeviceId3, mediaRecorderRef3, sendMessage3,isRecording3,canvasRef2);
    } else {
      if (mediaRecorderRef3.current && mediaRecorderRef3.current.state !== 'inactive') mediaRecorderRef3.current.stop();
    }

    return () => {
      [mediaRecorderRef3].forEach((ref) => {
        if (ref.current && ref.current.state !== 'inactive') ref.current.stop();
      });

      [videoRef3].forEach((ref) => {
        if (ref.current && ref.current.srcObject) {
          const stream = ref.current.srcObject;
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      });
    };
  }, [isRecording3]);

  const handleToggleRecording1 = () => {
    setIsRecording1(prev => !prev);
  };
  const handleToggleRecording2 = () => {
    setIsRecording2(prev => !prev);
  };
  const handleToggleRecording3 = () => {
    setIsRecording3(prev => !prev);
  };


  return (
    <div className=' absolute max-h-[91.8vh] w-full flex flex-row scrollbar-none'>
      <div className="max-h-full min-w-[25%] flex flex-col  overflow-y-auto overflow-x-hidden scrollbar-none bg-white py-5">
        <div className='flex flex-col min-w-full mx-[10%]'>
          <div className=' text-stone-900'>
            <h1 className='text-4xl font-koulen'>Monitor</h1>
            <h2 className='text-2xl mt-[.5rem] font-koulen'>Camera Feeds</h2>
          </div>
          <div className=' text-black'>
            <div className='mt-[1rem] font-koulen'>
              <h1 className='ml-1 font-koulen'>Angle One</h1>
              <select  onChange={(e) => setSelectedDeviceId1(e.target.value)} value={selectedDeviceId1}  className='mb-4 font-koulen'>
                {devices.map((device) => (
                  <option key={device.deviceId} value={device.deviceId} className='font-koulen'>
                    {device.label || `Camera ${device.deviceId}`}
                  </option>
                ))}
              </select>
              <div className="relative max-w-[50%]">
                <video className="w-full rounded-md" ref={videoRef1} autoPlay muted />
                <canvas ref={canvasRef1} className="absolute top-0 left-0 w-full h-full rounded-md" />
              </div>
              <div className='flex-row mt-2'>
                <button className="bg-stone-950 text-stone-100 font-dangrek px-[1rem] py-[.5rem] rounded-sm mr-[1.5rem]" onClick={handleToggleRecording1}>
                  Start
                </button>
                <button className="bg-stone-950 text-stone-100 font-dangrek px-[1.5rem] py-[.5rem] rounded-sm ml-[1.5rem]" onClick={handleToggleRecording1}>
                  End
                </button>
              </div>
            </div>
          </div>
          <div className='text-black'>
            <div className='mt-[1rem] font-koulen'>
            <h1 className='ml-1 font-koulen'>Angle Two</h1>
              <select  onChange={(e) => setSelectedDeviceId2(e.target.value)} value={selectedDeviceId2}  className='mb-4 font-koulen'>
                {devices.map((device) => (
                  <option key={device.deviceId} value={device.deviceId} className='font-koulen'>
                    {device.label || `Camera ${device.deviceId}`}
                  </option>
                ))}
              </select>
              <div className="relative max-w-[50%]">
                <video className="w-full rounded-md" ref={videoRef2} autoPlay muted />
                <canvas ref={canvasRef2} className="absolute top-0 left-0 w-full h-full rounded-md" />
              </div>
              <div className='flex-row mt-2'>
                <button className="bg-stone-950 text-stone-100 font-dangrek px-[1rem] py-[.5rem] rounded-sm mr-[1.5rem]" onClick={handleToggleRecording2}>
                  Start
                </button>
                <button className="bg-stone-950 text-stone-100 font-dangrek px-[1.5rem] py-[.5rem] rounded-sm ml-[1.5rem]" onClick={handleToggleRecording2}>
                  End
                </button>
              </div>
            </div>
          </div>
          <div className='text-black'>
            <div className='mt-[1rem] font-koulen'>
            <h1 className='ml-1 font-koulen'>Angle Three</h1>
              <select  onChange={(e) => setSelectedDeviceId3(e.target.value)} value={selectedDeviceId3}  className='mb-4 font-koulen'>
                {devices.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}  className='font-koulen'>
                    {device.label || `Camera ${device.deviceId}`}
                  </option>
                ))}
              </select>
              <div className="relative max-w-[50%]">
                <video className="w-full rounded-md" ref={videoRef3} autoPlay muted />
                <canvas ref={canvasRef3} className="absolute top-0 left-0 w-full h-full rounded-md" />
              </div>
              <div className='flex-row mt-2'>
                <button className="bg-stone-950 text-stone-100 font-dangrek px-[1rem] py-[.5rem] rounded-sm mr-[1.5rem]" onClick={handleToggleRecording3}>
                  Start
                </button>
                <button className="bg-stone-950 text-stone-100 font-dangrek px-[1.5rem] py-[.5rem] rounded-sm ml-[1.5rem]" onClick={handleToggleRecording3}>
                  End
                </button>
              </div>
            </div>
          </div>
        </div>
      </div >
        <div className='max-h-full min-w-[75%] bg-[#121417] flex flex-col overflow-y-auto'>
          <div className='ml-[2rem] mt-[2rem]'>
            <h1 className='text-stone-50 font-koulen text-4xl mt-1' onClick={getslots}>FreshSmart</h1>
            <div className='flex flex-row mt-[2rem]'>
               {/* <img  className='w-[226px] h-[226px] relative rounded-sm' src={urlmango}  alt='productImage'></img> */}
               <div className='min-w-full'>
                 <h1 className='font-koulen text-slate-100 text-xl'>product detail</h1>
                 <div className='bg-[#6F6B6B] min-h-1 max-w-[90%] mt-2'></div>
                 <div className='flex flex-row'>
                     <div className=' mt-[1rem] space-y-[1rem]  '>
                        <div className=''>
                          <label className='font-koulen text-stone-50'>brand name</label>
                          <label className='font-koulen text-[#6B6B6B] ml-[4rem]'>{productInfo.brandName}</label>
                        </div>
                        <div className=''>
                          <label className='font-koulen text-stone-50'>mrp</label>
                          <label className='font-koulen text-[#6B6B6B] ml-[7rem]'>{productInfo.mrpValue}</label>
                        </div>
                        <div className=''>
                          <label className='font-koulen text-stone-50'>Expiry</label>
                          <label className='font-koulen text-[#6B6B6B] ml-[6rem]'>{productInfo.expiryDate}</label>
                        </div>
                        <div className=''>
                          <label className='font-koulen text-stone-50'>object type</label>
                          <label className='font-koulen text-[#6B6B6B] ml-[3.8rem]'>{productInfo.description}</label>
                        </div> 
                     </div>
                      <div className='ml-[14rem] mt-[1rem] font-koulen'>
                        <h1 className='text-slate-100 text-2xl font-koulen'>Freshness indication</h1>
                        <h1 className={`text-2xl mt-[1rem] font-koulen ${productInfo.confidence < 70 ? 'text-red-500' : 'text-emerald-500'} ${productInfo.confidence.toLowerCase().includes('confidence not available') ? 'ml-[-1rem]' : 'ml-[5.5rem]'}`}>{productInfo.confidence}</h1>
                        <h1 className='text-slate-100 text-sm/5 ml-[1rem] font-koulen'>Good Confidence - <span className='text-emerald-500'> 70-100%</span></h1>
                        <div className='flex flex-row space-x-[8rem] mt-[1rem] '>
                          <h1 className={`text-md font-koulen ${productInfo.freshStatus.toLowerCase().includes('rotten') ? 'text-red-500' : 'text-slate-100'}`}>rotten</h1>
                          <h1 className={`text-md font-koulen ${productInfo.freshStatus.toLowerCase().includes('fresh') ? 'text-emerald-500' : 'text-slate-100 '}`}>fresh</h1>
                        </div>
                      </div>
                 </div>
               </div>
            </div>
          </div>
          <div className='ml-[2rem] mt-[7vh] flex flex-col'>
            <div className='flex flex-row gap-x-[33rem]'>
              <h1 className='font-koulen text-stone-100 text-4xl'>Scanned items</h1>
              <button
                className={`font-koulen font-extrabold text-xl bg-emerald-500 rounded-md px-4 hover:bg-emerald-600 transition-all duration-300 ease-in-out ${isReloading ? 'cursor-not-allowed' : ''}`}
                onClick={handleClick}
                disabled={isReloading} 
              >
                {isReloading ? 'Reloading...' : 'Reload'}
              </button>
            </div>
            <div className='flex flex-col font-koulen mt-[1rem] space-y-[1rem]  overflow-y-scroll  overflow-x-hidden max-h-[30vh] scrollbar-none'>
              {detaillist.map((data)=>(
                <div className='' key={uuidv4()}>
                  <h1 className='text-stone-100 text-xl  font-koulen'>{data.name}</h1>
                  <div className='flex flex-row space-x-[5rem]'>
                    <label className='text-[#9CABBA] font-koulen'>Expiry date: <span>{data.expiry_date}</span></label>
                    <label className='text-[#9CABBA]  font-koulen'>MRP: <span>{data.mrp}</span></label>
                    <label className='text-[#9CABBA] font-koulen'>Description: <span>{data.description}</span></label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};
 
export default VideoStream;
