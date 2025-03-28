import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props){ //사용자 정의 태그(대문자 네이밍) 컴포넌트 
  console.log("props", props.title);
  return <header><h1><a href="/"onClick={function(event){
    event.preventDefault();
    props.onChangeMode();
  }}>{props.title}</a></h1></header>
}

function Article(props){
  return <article>
    <h2>{props. title}{props.body}</h2>
    
  </article>
}

function Nav(props){
  const lis = []
    
  for(let i=0;i<props.topics.length;i++){
  let t = props.topics[i];
  lis.push(<li key={t.id}>
    <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
      event.preventDefault();
      props.onChangeMode(Number(event.target.id)); //태그에 받은 값은 문자이므로 숫자로 전환 필요요
    }}>{t.title}</a>
    </li>)
}

  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type='text' name='title' placeholder='title'/></p>
      <p><textarea name='body' placeholder='body'></textarea></p>
      <p><input type ="submit" value="Create"></input></p>
    </form>
  </article>
}

function Update(props){
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type='text' name='title' placeholder='title' value={title} onChange={event=>{
        setTitle(event.target.value); //props를 state로 바꿈꿈
      }}/></p>
      <p><textarea name='body' placeholder='body' value={body} onChange={event=>{
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type ="submit" value="Update"></input></p>
    </form>
  </article>
}
function App() {
  // const _mode = useState('WELCOME');
  // const mode = _mode[0];
  // const setMode = _mode[1];
  const [mode, setMode] = useState('WELCOME'); //초기값 지정
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'html ', body:'html is ...'},
    {id:2, title:'css ', body:'css is ...'},
    {id:3, title:'js ', body:'js is ...'}
  ]);
  let content = null;
  let contextControl = null;

  if(mode === 'WELCOME'){
    content = <Article title = "Welcome " body="hello, web"></Article>
  }else if(mode === 'READ'){
    let title, body = null;
    for(let i=0;i<topics.length;i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title = {title} body={body}></Article>
    contextControl =  <li><a href={"/update/" +id} onClick={event=>{
      event.preventDefault();
      setMode('UPDATE')
    }}>Update</a></li>
  } else if(mode === 'CREATE'){
    content = <Create onCreate={(_title,_body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics = [...topics] //객체 복제본 생성
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  } else if(mode ==='UPDATE'){
    let title, body = null;
    for(let i=0;i<topics.length;i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      const newTopics = [...topics];
      const updateTopic = {id:id, title:title, body:body};
      for(let i=0;i<newTopics.length;i++){
        if(newTopics[i].id === id){
          newTopics[i] = updateTopic;
          break;
        }
      }
      setTopics(newTopics);
    }}></Update>
  }

  return (
    <div className="App">
      <Header title = "React" onChangeMode={function(){
        setMode('WELCOME');
        alert('Header');
      }}></Header> 
      <Nav topics={topics} onChangeMode={function(_id){
        setMode('READ')
        setId(_id);
      }}></Nav>
      {content}
      <ul>
        <li><a href="/create" onClick={function(event){
          event.preventDefault();
          setMode('CREATE');
        }}>Create</a></li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
