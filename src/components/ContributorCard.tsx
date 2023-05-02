import { useState, useEffect } from 'react';
import { ContributorType, UserType } from '../utils/types';
import { getUser } from '../api/repo-api';

function ContributorCard({ contributorItem }: { contributorItem: ContributorType }) {

    const [showModal, setShowModal] = useState(false);
    const [errorHandle, setErrorHandle] = useState(false)
    const [userData, setUserData] = useState<UserType>({ name: '', location: '' });

    const handleMap = async (user: string) => {
        try {
            const temp_userData = await getUser({ user });
            let location = temp_userData?.location?.replaceAll(" ", "");
            location = location?.replaceAll(",", "+")
            setUserData({ name: temp_userData?.name, location });
            setShowModal(true);
        } catch (error) {
            setErrorHandle(true);
        }

    }

    return (
        <>
            <div className="flex flex-col p-[32px] bg-white rounded-[10px]">
                <div className="flex flex-row justify-between">
                    <div className='flex'>
                        <img className='max-w-[60px] h-auto' src={contributorItem.avatar} />
                    </div>
                    <div onClick={() => handleMap(contributorItem.name)} className='cursor-pointer'>
                        <img src='/mapItem.svg' />
                    </div>
                </div>
                <div className="flex flex-row mt-[15px]">
                    <p className='text-titleColor font-[700] text-[18px]'>{contributorItem.name}</p>
                </div>
                <div className="flex flex-row">
                    <p className='text-descriptionColor'>{`${contributorItem.commits} commits`}</p>
                </div>
                <div className="flex flex-row justify-center mt-[20px]">
                    <button className='text-buttonColor border-[1px] border-buttonColor px-[10px] py-[5px] rounded-md'><a href={contributorItem.github}>VIEW REPOSITORIES</a></button>
                </div>
            </div>

            {showModal ? (
                <>
                    <div id="small-modal" tabIndex={-1} className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                        <div className="relative w-full max-w-lg max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                        {userData.name}
                                    </h3>
                                    <button
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-hide="small-modal"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="p-6 space-y-6">
                                    <iframe className='w-full' id="gmap_canvas" src={`https://maps.google.com/maps?q=${userData.location}&output=embed`} frameBorder="0" scrolling="no"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            ) : null}

            {
                errorHandle ? (
                    <>
                        <div id="popup-modal" tabIndex={-1} className="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <div className="relative w-full max-w-md max-h-full">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <button
                                        type="button"
                                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                        data-modal-hide="popup-modal"
                                        onClick={() => setErrorHandle(false)}
                                    >
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <div className="p-6 text-center">
                                        <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">There is no Location Data</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : null
            }
        </>
    );
}

export default ContributorCard;