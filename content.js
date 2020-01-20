// Global constants
// var liked = ['3e', 'a6', 'ff'].map(n => parseInt(n, 16));
var liked = ['00', 'ff', '00'].map(n => parseInt(n, 16));
var disliked = ['ff', '00', '00'].map(n => parseInt(n, 16));

const getTooltip = () => {
  let $tooltip = $("ytd-sentiment-bar-renderer").find("#tooltip");
  while ($tooltip.length === 0)
    $tooltip = $("ytd-sentiment-bar-renderer").find("#tooltip");
  console.log("tooltip: " + $tooltip.text());
  return $tooltip;
};

const getLikeBar = () => {
  let $likeBar = $("ytd-sentiment-bar-renderer").find("#like-bar");
  while ($likeBar.length === 0)
    $likeBar = $("ytd-sentiment-bar-renderer").find("#like-bar");
  console.log("likeBar");
  return $likeBar;
};

// Gets hex representation of colour at ratio (0 to 1) from red to blue.
const getColour = (ratio) => {
  console.log(`getColour: ${ratio}`);
  let colour = [0, 1, 2].map(
    (i) => Math.round((1 - ratio) * disliked[i] + ratio * liked[i])
  );

  console.log(colour);

  return `rgb(${colour.join(', ')})`;
};

const updateLikeBarColour = ($likeBar, ratio) => {
  console.log("update");
  // console.log("width: " + $likeBar.css("width"));
  $likeBar.css({ "background-color": getColour(ratio) });
};

const getRatioFromTooltip = ($tooltip) => {
  let nums = $tooltip.text().split(" / ").map(
    (n) => parseInt(n.replace(/,/g, ""))
  );

  return Math.round(100 * nums[0] / (nums[0] + nums[1])) / 100.0;
};

const run = () => {
  let $tooltip = getTooltip();
  // console.log($tooltip.text());
  let $likeBar = getLikeBar();
  let ratio = getRatioFromTooltip($tooltip);
  console.log(ratio);

  updateLikeBarColour($likeBar, ratio);

  let mutationObserver = new MutationObserver(
    (mutationList, observer) => {
      mutationList.forEach((mutation) => {
        if (mutation.type === "characterData") {
          console.log(`target: ${mutation.target.data}`);
          // ratio = getRatioFromTooltip;
          // updateLikeBarColour($likeBar, ratio);
        } else if (mutation.type === "attributes") {
          console.log(`target: ${mutation.target}`);
        }
      })
    }
  )

  mutationObserver.observe(
    $tooltip[0],
    {
      attributes: true,
      attributeOldValue: true,
      characterData: true,
      characterDataOldValue: true,
      childList: true,
      subtree: true
    }
  );
}

run();
