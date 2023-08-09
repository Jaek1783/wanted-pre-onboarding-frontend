import { useState } from "react";
import axios from "axios";
import styles from './todo.module.css';
const Todo = ({ item, updateHandler, editingIndex, cancelHandler, setList, handleDeleteClick}) => {
    const isEditing = editingIndex === item.id;
    const [editedTodo, setEditedTodo] = useState(item.todo);
    const [isChecked, setIsChecked] = useState(false);
  const handleInputChange = (e) => {
    setEditedTodo(e.target.value);
  };

  const handleCheckboxChange = async (item) => {
    try {
      const accessToken = window.localStorage.getItem('jwt');
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      };
  
      // 체크박스의 체크 여부에 따라 isCompleted를 업데이트하여 서버에 전송
      const desc = item.todo;
      const response = await axios.put(
        `http://localhost:8000/todos/${item.id}`,
        { todo:desc, isCompleted: !isChecked }, // 상태 반전
        { headers }
      );
  
      if (response.status === 200) {
        setIsChecked((checked) => !checked); // 상태 반전으로 변경된 값 업데이트
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  console.log(isChecked)
  const handleSaveClick = async () => {
    if (editedTodo.trim() === "") {
      // 수정된 내용이 비어있을 경우, 저장하지 않고 종료
      updateHandler(item);
      return;
    }
    try {
      // 수정된 값을 서버에 전송하여 객체를 수정
      const accessToken = window.localStorage.getItem('jwt');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      };
      const updatedItem = { ...item, todo: editedTodo };
      await axios.put(`http://localhost:8000/todos/${item.id}`, updatedItem, {headers});
      const response = await axios.get('http://localhost:8000/todos', { headers });
      setList(response.data);
      // 저장 후에는 편집 모드 종료
      updateHandler(item);
    } catch (error) {
      console.error('변경 사항 저장 실패:', error);
    }
  };
    return (
      <li className={styles.item}>
         <label>
          <input type="checkbox" onChange={()=>{handleCheckboxChange(item)}}/>
          {isEditing ? (
            <input data-testid="modify-input" 
                   type='text'
                   value={editedTodo}
                   onChange={handleInputChange} 
            />
          ) : (
            <span>{item.todo}</span>
          )}
         </label>
         <div className={styles.btnContainer}>
         <button data-testid="modify-button" onClick={isEditing ? handleSaveClick : () => updateHandler(item)}>
           {isEditing ? "제출" : "수정"}
         </button>
        {isEditing ? <button data-testid="cancel-button" onClick={()=>{cancelHandler(item)}}>취소</button>
        :<button data-testid="delete-button" onClick={()=>{handleDeleteClick(item)}}>삭제</button>}
         </div>
      </li>
    );
  };
  
  export default Todo;
  