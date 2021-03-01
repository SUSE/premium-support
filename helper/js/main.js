function capitalize(str){
    return (str === null || str.length === 0) ? str : str[0].toUpperCase() + str.slice(1);
  }
  
function initialIsLower( word ){
  return /[a-z]/.test(word.charAt(0))
}

$(document).ready(() => {

    $('#button-1').prop('disabled', true);
    const pint = 'https://susepubliccloudinfo.suse.com/v1/';
    var pintProvider = pint + 'providers.json'

    var providerDropdown = $('#provider-dropdown');
    var regionDropdown = $('#region-dropdown');
    var regionServerContent = $('#region-servers');
    var rmtServerContent = $('#rmt-servers');
    var rmtServerContent2 = $('#rmt-servers-2');

    /** Initialize when the page first loads*/
    providerDropdown.empty();
    providerDropdown.append('<option selected="true" disabled>Choose Provider</option>');
    regionDropdown.empty();
    regionDropdown.append('<option selected="true" disabled>Choose Region</option>');

    $.getJSON(pintProvider, (providerData) => {
      $.each(providerData.providers, function (index, provider) {
        /** Exclude oracle and alibaba. They don't have managed update infrastructure */
        if ((provider.name != "oracle") && (provider.name != "alibaba")) {
          providerDropdown.append($('<option></option>').attr('value', provider.name).text(capitalize(provider.name)));
        }
      });
    });
  
    regionServerContent.empty();
    
    var stepOne = function() {
      regionServerContent.empty();
      $('.footer').empty();
      $('#step2').hide();
      $('#step3').hide();
      $('#step4').hide();
      $('#button-2').removeClass('active');
      $('#button-3').removeClass('active');
      $('#button-4').removeClass('active');

      $('#step1').show();
      $('#button-1').addClass('active');


      var pintRegionServers = pint + provider + '/servers/regionserver.json'

      $.getJSON(pintRegionServers, function (regionServerData) {
        $.each(regionServerData.servers, function(index, regionServer) {
          regionServerContent.append($('<div></div>').attr('value', regionServer.ip).text(regionServer.ip));
        });
      });

      $('.footer').append("<div id='footernav'></div>");
    }
    /** When provider dropdown changes */
    $('#provider-dropdown').change(function() {
      regionDropdown.empty();
      regionServerContent.empty();
      $('#step1').hide();
      $('#step2').hide();
      $('#step3').hide();
      $('#step4').hide();
      $('#button-1').removeClass('active');
      $('#button-2').removeClass('active');
      $('#button-3').removeClass('active');
      $('#button-4').removeClass('active');

      /** Get the current provider */
      provider = $('#provider-dropdown').val();

      var pintRegion = pint + provider + '/regions.json'

      /** Get list of regions for provider */
      $.getJSON(pintRegion, function (regionData) {
        $.each(regionData.regions, function (index, region) {
          if (initialIsLower(region.name)) {
            regionDropdown.append($('<option></option>').attr('value', region.name).text(region.name));
          }
        });
      });

      stepOne();
  
      });

    /** If Step 2 button is pushed */
    $('#button-2').on('click', () => {
      if (provider) {
        rmtServerContent.empty();
        rmtServerContent2.empty();
        regionServerContent.empty();
        $('#step1').hide();
        $('#step4').hide();
        $('#step3').hide();
        $('#button-1').removeClass('active');
        $('#button-3').removeClass('active');
        $('#button-4').removeClass('active');
        $('#button-2').addClass('active');
        $('#step2').show()
        pintRMTServers = pint + provider + '/servers/smt.json'
        currentRegion = $('#region-dropdown').val();
        $.getJSON(pintRMTServers, function (rmtServerData) {
          $.each(rmtServerData.servers, function(index, rmtServer) {
            if (rmtServer.region == currentRegion) {
              rmtServerContent.append($('<div></div>').attr('value', rmtServer.ip).text(rmtServer.ip));
              rmtServerContent2.append($('<div></div>').attr('value', rmtServer.ip).text(rmtServer.ip));
            }
          });
        });
      }
    });

    $('#button-3').on('click', () => {
      if (provider) {    
        $('#step1').hide();
        $('#step2').hide();
        $('#step4').hide();
        $('#button-1').removeClass('active');
        $('#button-2').removeClass('active');
        $('#button-4').removeClass('active');
        $('#button-3').addClass('active');
        $('#hosts-record').empty();
        $('#step3').show()

        if (provider == "amazon") {
          record = "smt-ec2.susecloud.net";
        }
        else if (provider == "google") {
          record = "smt-gce.susecloud.net";
        }
        else if (provider == "microsoft") {
          record = "smt-azure.susecloud.net"
        }
        $('#hosts-record').append(record);
      }
    });

    $('#button-4').on('click', () => {
      if (provider) {    
        $('#step1').hide();
        $('#step2').hide();
        $('#step3').hide();
        $('#button-1').removeClass('active');
        $('#button-2').removeClass('active');
        $('#button-3').removeClass('active');
        $('#button-4').addClass('active');
        $('#step4').show()
      }
    });

    /** If the region dropdown changes */
    $('#region-dropdown').change(function() {
      rmtServerContent.empty();
      rmtServerContent2.empty();
      pintRMTServers = pint + provider + '/servers/smt.json'
      currentRegion = $('#region-dropdown').val();
      $.getJSON(pintRMTServers, function (rmtServerData) {
        $.each(rmtServerData.servers, function(index, rmtServer) {
          if (rmtServer.region == currentRegion) {
            rmtServerContent.append($('<div></div>').attr('value', rmtServer.ip).text(rmtServer.ip));
            rmtServerContent2.append($('<div></div>').attr('value', rmtServer.ip).text(rmtServer.ip));
          }
        });
      });
    });


    $('#button-1').on('click', () => {
      if (provider) {
        stepOne();
      }

    });

});