'use client'

export default function CommonButton(props: {_handleClick: () => void, _text: string}){
    return (
        <button 
            onClick={props._handleClick} 
            className='mx-2 bg-foreground hover:bg-background py-2 px-4 rounded-lg font-mono text-sm text-background hover:text-foreground border hover:border-foreground'>
                {props._text}
        </button>
    )
}