import { useEffect,useState } from "react";
import Todo from "./todo-item";
import axios from "axios";
import styles from './todo.module.css';
import { useNavigate } from "react-router-dom";
const TodoList = ({todoRef,addList, list, setList, listRef})=>{
    const navigate = useNavigate();
    const [update, setUpdate] = useState(false);
    const [editingIndex, setEditingIndex] = useState(-1);

    const logoutHandler = ()=>{
        window.localStorage.removeItem('jwt');
        navigate('/');
    };
useEffect(()=>{
    const fetchData = async () => {
        try {
          const accessToken = window.localStorage.getItem('jwt');
          const headers = {
            'Authorization': `Bearer ${accessToken}`
          }
          const response = await axios.get('http://localhost:8000/todos',{headers});
          setList(response.data);
        } catch (error) {
          console.error('데이터 가져오기 실패:', error);
        }
      };
  
      fetchData();
},[setList])
const updateHandler = (item)=>{
    setUpdate(update => !update);
    if (editingIndex === item.id) {
        // 이미 편집 중인 항목일 경우, 저장 로직 구현
        // 예: axios.put(...) 등을 사용하여 서버에 변경사항 저장
        setEditingIndex(-1); // 편집 종료
      } else {
        setEditingIndex(item.id); // 편집 시작
      }
};
const cancelHandler = (item)=>{
    setUpdate(update => !update);
    if(editingIndex === item.id){
        setEditingIndex(-1);
    }
}
const handleDeleteClick = async (item) => {

    try {
      const accessToken = window.localStorage.getItem('jwt');
        const headers = {
            'Authorization': `Bearer ${accessToken}`
          }
      await axios.delete(`http://localhost:8000/todos/${item.id}`,{headers});

      const response = await axios.get('http://localhost:8000/todos', { headers });
      setList(response.data);
    } catch (error) {
      console.error('객체 삭제 실패:', error);
    }
  };
    return <div className={styles.container}>
        <form>
            <input data-testid="new-todo-input" ref={todoRef}/>
            <button data-testid="new-todo-add-button" onClick={addList}>추가</button>
        </form>
        <ul>
            {list.map((item,index) => <Todo key={index}
                                            item={item} 
                                            updateHandler={updateHandler} 
                                            update={update} 
                                            listRef={listRef} 
                                            index={index}
                                            editingIndex={editingIndex}
                                            cancelHandler={cancelHandler}
                                            setList={setList}
                                            handleDeleteClick={handleDeleteClick}
                                            />)}
        </ul>
        <button className={styles.logout} onClick={logoutHandler}>로그아웃</button>
    </div>;
};
export default TodoList;