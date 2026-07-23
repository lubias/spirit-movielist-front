import React from 'react'

function CardCast({ person, configuration }) {
    const hasPhoto = Boolean(person.profile_path) && configuration?.base_url && configuration?.profile_sizes?.length > 1;
    const initials = person.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(word => word[0])
        .join('')
        .toUpperCase();

    return (
        <div className="flex-none w-32">
            {hasPhoto ? (
                <img
                    src={`${configuration.base_url}${configuration.profile_sizes[1]}${person.profile_path}`}
                    alt={person.name}
                    className="w-32 h-32 rounded-full object-cover mb-3"
                />
            ) : (
                <div className="w-32 h-32 rounded-full mb-3 flex items-center justify-center bg-black-10 border border-black-20 text-2xl font-bold text-white/70">
                    {initials}
                </div>
            )}
            <h3 className="text-sm font-semibold text-nowrap overflow-hidden text-ellipsis">{person.name}</h3>
            <p className="text-xs text-white/40 text-nowrap overflow-hidden text-ellipsis">{person.character}</p>
        </div>
    )
}

export default CardCast
