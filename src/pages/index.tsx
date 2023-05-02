import React, { useEffect, useState, useRef } from 'react';
import ContributorCard from '../components/ContributorCard';
import Header from "../section/Header";
import { getTopContributors } from '../api/repo-api';
import { ContributorType } from '@/utils/types';

const headerSelections = [
  'Top Contributors'
]

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [contributors, setContributors] = useState<ContributorType[]>([]);
  const [currPage, setCurrPage] = useState(1);// storing current page number
  const [prevPage, setPrevPage] = useState(0);// storing prev page number
  const [wasLastList, setWasLastList] = useState(false);// setting a flag to know the last list

  const scrollRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(1);

  const onScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

      if ((scrollTop + clientHeight).toFixed(0) === scrollHeight.toFixed(0)) {
        // This will be triggered after hitting the last element.
        // API call should be made here while implementing pagination.
        setLoading(true);
        setCurrPage(currPage + 1);
      }
    }
  }

  useEffect(() => {
    const apiTopContributors = async () => {
      let temp_contributors: ContributorType[] = [];
      if (!loading) {
        setLoading(true);
        temp_contributors = await getTopContributors({ perPage: 24, page: currPage });
        setContributors(temp_contributors);
      }
      setLoading(false);
    }

    //current Page 
    const page = pageRef.current;
    apiTopContributors();

  }, [])

  useEffect(() => {
    const fetchData = async () => {
      let temp_contributors: ContributorType[] = [];
      temp_contributors = await getTopContributors({ perPage: 24, page: currPage });
      if (!temp_contributors.length) {
        setWasLastList(true);
        return;
      }
      setPrevPage(currPage);
      setContributors([...contributors, ...temp_contributors]);
      setLoading(false);
    };

    if (!wasLastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, wasLastList, prevPage, contributors]);

  return (
    <div
      className='w-full flex flex-col h-[100vh] overflow-auto bg-[#E5E5E5]'
      ref={scrollRef}
      onScroll={onScroll}
    >
      <div className='flex flex-col'>
        <div className='w-full h-[70px] bg-white flex' />

        <div className='flex flex-col p-[32px] mx-auto'>
          <div className='flex w-full'>
            <Header items={headerSelections} />
          </div>
          <div className='flex w-full mt-[30px]'>
            <div
              className='grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[30px]'
            >
              {
                contributors.map((contributor: ContributorType, index: number) => <ContributorCard key={index} contributorItem={contributor} />)
              }

            </div>
          </div>
          {
            loading && <div className='text-descriptionColor font-[400] text-[24px] justify-center w-full text-center mt-[15px]'>
              Loading ...
            </div>
          }
        </div>
      </div>


    </div>
  )
}
