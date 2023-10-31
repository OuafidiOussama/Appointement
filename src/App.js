import { Icon } from '@iconify/react'
import './App.css';
import Form from './components/Form';


function App() {
  return (
    <div className="flex flex-col items-center">
        <nav className="w-9/12 flex items-center py-4">
          <Icon className="text-5xl text-red-400" icon="bx:calendar" />
          <h1 className='text-5xl '>Your Appointements</h1>
        </nav>
        <Form />
    </div>
  );
}

export default App;
