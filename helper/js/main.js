// capitalize provider name 
function capitalize(str){
  return (str === null || str.length === 0) ? str : str[0].toUpperCase() + str.slice(1);
}

// to make all regions lowercase
function initialIsLower( word ){
return /[a-z]/.test(word.charAt(0))
}

// page loaded
$(document).ready(() => {
  
  const pint = 'https://susepubliccloudinfo.suse.com/v1/';  // api location
  var pintProvider = pint + 'providers.json' // provider api
  var providerDropdown = $('#provider-dropdown');  // provider dropdown field
  var regionDropdown = $('#region-dropdown');  // region dropdown field
  var regionServerContent = $('#region-servers');  // region servers for step 1
  var rmtServerContent = $('.rmt-servers');  // rmt servers for https step 2

  // Function to load page for step 1
  var stepOne = function() {
    var pintRegionServers = pint + provider + '/servers/regionserver.json'
    regionServerContent.empty();
    $('.footer').empty();
    $("#step2, #step3, #step4").hide();
    $("#button-2, #button-3, #button-4").removeClass('active');
    $('#step1').show();
    $('#button-1').addClass('active');
    // Get region servers
    $.getJSON(pintRegionServers, function (regionServerData) {
      $.each(regionServerData.servers, function(index, regionServer) {
        regionServerContent.append($('<div></div>').attr('value', regionServer.ip).text(regionServer.ip));
      });
    });
    // Add footer nav
    $('.footer').append("<div id='footernav'></div>");
  }

  // Function to load page for step 2
  var stepTwo = function() {
    if (provider) {
      rmtServerContent.empty();
      regionServerContent.empty();
      $("#step1, #step4, #step3").hide();
      $("#button-1, #button-3, #button-4").removeClass('active');
      $('#button-2').addClass('active');
      $('#step2').show()
      var pintRMTServers = pint + provider + '/servers/smt.json'  // api for update servers
      currentRegion = $('#region-dropdown').val();
      $.getJSON(pintRMTServers, function (rmtServerData) {
        count = 0;
        $.each(rmtServerData.servers, function(index, rmtServer) {
          if (rmtServer.region == currentRegion) {
            count++;
            rmtServerContent.append($('<div></div>').attr('value', rmtServer.ip).text(rmtServer.ip));
          }
        });
        if (count == 0) {
          rmtServerContent.append($('<div></div>').attr('value', "NO SERVERS FOR THIS REGION").text("NO SERVERS FOR THIS REGION"));
        }
      });
    }
  }

  /** Initialize PROVIDER and REGION dropdown when the page first loads*/
  providerDropdown.empty();
  regionDropdown.empty();
  providerDropdown.append('<option selected="true" disabled>Choose Provider</option>');
  regionDropdown.append('<option selected="true" disabled>Choose Region</option>');

  // Get and populate provider dropdown data
  $.getJSON(pintProvider, (providerData) => {
    $.each(providerData.providers, function (index, provider) {
      /** Exclude oracle and alibaba. They don't have managed update infrastructure */
      if ((provider.name != "oracle") && (provider.name != "alibaba")) {
        providerDropdown.append($('<option></option>').attr('value', provider.name).text(capitalize(provider.name)));
      }
    });
  });

  /** When provider dropdown changes, restart */
  $('#provider-dropdown').change(function() {
    regionDropdown.empty();
    regionServerContent.empty();
    /** Get the current provider */
    provider = $('#provider-dropdown').val();
    var pintRegion = pint + provider + '/regions.json'  // api for provider regions
    /** Get list of regions for provider */
    $.getJSON(pintRegion, function (regionData) {
      $.each(regionData.regions, function (index, region) {
        if (initialIsLower(region.name)) {
          regionDropdown.append($('<option></option>').attr('value', region.name).text(region.name));
        }
      });
    });
    // Populate step 1 - regionserver 
    stepOne();
    });

  /** If Step 1 button - region servers - is pushed */
  $('#button-1').on('click', () => {
    if (provider) {
      stepOne();
    }
  });

  /** If Step 2 button - update servers - is pushed */
  $('#button-2').on('click', () => {
    stepTwo();
  });

  /** If Step 3 button - proxy servers considerations - is pushed */
  $('#button-3').on('click', () => {
    if (provider) {    
      $("#step1, #step2, #step4").hide();
      $("#button-1, #button-2, #button-4").removeClass('active');
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

  /** If Step 4 button - additional support - is pushed */
  $('#button-4').on('click', () => {
    if (provider) {    
      $("#step1, #step2, #step3").hide();      
      $("#button-1, #button-2, #button-3").removeClass('active');
      $('#button-4').addClass('active');
      $('#step4').show()
    }
  });

  /** If the region dropdown changes */
  $('#region-dropdown').change(function() {
    stepTwo();
  });

});