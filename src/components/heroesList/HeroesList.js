import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import { useGetHeroesQuery, useDeleteHeroesMutation } from '../../api/apiSlice';
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {

    const {
        data: heroes = [],
        isLoading,
        isError,
    } = useGetHeroesQuery();

    const [deleteHero] = useDeleteHeroesMutation();

    const activeFilter = useSelector(state => state.filters.activeFilter)

    const filteredHeroes = useMemo(() => {
        const filteredHeroe = heroes.slice();
        if (activeFilter === 'all') {
            return filteredHeroe
        } else {
            return filteredHeroe.filter(item => item.element === activeFilter)
        }
    }, [heroes, activeFilter])


    const onDelete = useCallback((id) => {
        deleteHero(id);
        // eslint-disable-next-line  
    }, []);

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition 
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem  {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;