import React from 'react'

function ProviderChip({ provider, configuration, badge }) {
    const hasLogo = configuration?.base_url && configuration?.logo_sizes?.length > 2;

    return (
        <div className="flex items-center gap-3 bg-black-06 border border-black-15 rounded-xl pl-2 pr-4 py-2">
            {hasLogo && (
                <img
                    src={`${configuration.base_url}${configuration.logo_sizes[2]}${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="w-10 h-10 rounded-lg"
                />
            )}
            <div>
                <p className="text-sm font-semibold">{provider.provider_name}</p>
                <p className="text-xs text-white/40 capitalize">{badge}</p>
            </div>
        </div>
    )
}

export default ProviderChip
