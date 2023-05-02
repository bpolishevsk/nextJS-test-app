import { ContributorType } from '../utils/types';

function ContributorCard({ contributorItem }: { contributorItem: ContributorType }) {
    return (
        <>
            <div className="flex flex-col p-[32px] bg-white rounded-[10px]">
                <div className="flex flex-row justify-between">
                    <div className='flex'>
                        <img className='max-w-[60px] h-auto' src={contributorItem.avatar} />
                    </div>
                    <div>
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
        </>
    );
}

export default ContributorCard;