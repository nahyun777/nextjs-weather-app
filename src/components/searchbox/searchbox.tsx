import { IoSearch } from 'react-icons/io5';
import './searchbox.css';

type Props = {
    //className?: string;
    searchValue:string;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox({searchValue, onChange, onSubmit} : Props){
    return(
        <div>
            <form className='searchbox-form' onSubmit={onSubmit}>
                <input type='text'
                    value={searchValue}
                    placeholder='위치를 입력하세요'
                    onChange={onChange}
                    className='searchbox-input'
                />
                <button className='searchbox-button'>
                    <IoSearch />
                </button>
            </form>
        </div>
    )
}