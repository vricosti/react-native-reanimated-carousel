export interface RemoteButton {
    imgrect: number[];
    scancode: string;
    repeat?: number;
    gap?: number;
  }
  
  interface RemoteDimensions {
    length: number;
    width: number;
    depth: number;
  }
  
  export interface Remote {
    type: string;
    brand: string;
    uid: string;
    remoteModelNumber: string;
    deviceModelnumber: string;
    name: string;
    image: string;
    dimensions: RemoteDimensions;
    buttons: Record<string, RemoteButton>;
  }
  
  export interface RemoteAppData {
    friendlyName: string;
    associatedBeacon?: Beacon;
  }
  
  export interface Beacon {
    id: string;
  }
  
  export interface RemoteData {
    remote: Remote;
    appData: RemoteAppData;
  }
  

  const remotes: RemoteData[] = [
    {
        "remote": {
            "uid": "FREE-FREEBOX-REVOLUTION",
            "type": "ir",
            "brand": "FREE",
            "deviceModelnumber": "FREE-FREEBOX-REVOLUTION",
            "remoteModelNumber": "",
            "name": "free-freebox-revolution",
            "image": "free-freebox-revolution.jpg",
            "dimensions": {
                "length": 200, 
                "width": 47, 
                "depth": 18
            },
            "buttons": {
            }
        },
        "appData": {
            "friendlyName": "free-freebox-revolution",
            "associatedBeacon": {
                "id": ""
            },
        }
    },
    {
        "remote": {
            "uid": "SONY-RMTTX101D",
            "type": "ir",
            "brand": "SONY",
            "deviceModelnumber": "",
            "remoteModelNumber": "RMTTX101D",
            "name": "sony-rmt-tx101d",
            "image": "sony-rmt-tx101d.jpg",
            "dimensions": {
                "length": 200, 
                "width": 47, 
                "depth": 18
            },
            "buttons": {
            }
        },
        "appData": {
            "friendlyName": "sony-rmt-tx101d",
            "associatedBeacon": {
                "id": ""
            },
        }
    }
    
  ];

  export default remotes;