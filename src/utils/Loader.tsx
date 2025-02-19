const Loader = () => {
    return (
        <div className='bg-opacity-55 fixed top-0 z-50 flex h-screen w-screen items-center justify-center bg-black'>
            <div className='border-primary h-19 w-19 animate-spin rounded-full border-6 border-solid border-t-transparent'></div>
        </div>
    );
};

export default Loader;
