$(function()
{
    function toggleMode(isDarkmode)
    {
        const $body = $(document.body);

        if( isDarkmode )
        {
            $body.addClass("theme--darkmode");
            $body.removeClass("theme--lightmode");
        }
        else{
            $body.removeClass("theme--darkmode");
            $body.addClass("theme--lightmode");
        }
    }

    if( !window.matchMedia )
    {
        return;
    }

    toggleMode( window.matchMedia('(prefers-color-scheme: dark)').matches );
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e=>
    {
        toggleMode(e.matches);
    });
});


const PortalUtil = 
{
    isSupported: false,
};

$(function(){   
    if( 'HTMLPortalElement' in window )
    {
        $("body").addClass("is-supported-portal")

        const portal = document.querySelector("#site-transition-portal");
        const $portalLinks = $("a[data-portal-transition]");

        $portalLinks.each(function(index,element)
        {
            $(element).data("href", $(element).attr("href"));
            $(element).attr("href", "javascript:void(0)");
        });
        $portalLinks.on("click", function(e)
        {
            var $target = $(e.target).closest("a");

            $(portal).addClass("activate");
            $(portal).addClass("activate");
            portal.src = $target.data("href");
        });

        $(portal).on("animationend", function(e)
        {
            portal.activate();
        });
    }
});