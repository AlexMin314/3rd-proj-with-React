import { setRooms, getRooms } from '../API/roomAPI';

const initialRooms = getRooms();

const roomInfo = (state = initialRooms, action) =>{

  switch (action.type) {
  case 'ADD_ROOM':
      return [action.roomName]
      break;

    default:
      return state
  }
}

export default roomInfo;
